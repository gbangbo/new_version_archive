import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Select2Module} from 'ng-select2-component';
import {ToastrService} from 'ngx-toastr';

import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {
    ASSOCIATION_URL, ChampExterne, CHAMPS_INTERNES, corpsAssociation, mapRecordRequete,
    messageErreur, RECORDS_URL, RecordRequeteRow,
} from '../io-externe-api';

/**
 * ══ ÉTAPE 4 : CORRESPONDANCES ═══════════════════════════════════════════════
 *
 * Le partenaire nomme ses champs comme il l'entend. Tant que personne n'a dit
 * que son `code_docs` est notre `code_docs` et que son `libboites` est notre
 * `idboites`, ce qu'on rapatrie n'est qu'un tas de valeurs sans destination.
 * Cet écran est l'endroit où cette traduction se déclare, une fois, par requête.
 *
 * Le champ interne est libre : la liste `CHAMPS_INTERNES` n'est qu'une aide à
 * la saisie. Un partenaire peut alimenter une propriété qui n'y figure pas.
 */
@Component({
    selector: 'app-correspondances',
    imports: [CommonModule, FormsModule, Select2Module],
    templateUrl: './correspondances.component.html',
    styleUrl: './correspondances.component.scss',
})
export class CorrespondancesComponent implements OnInit {

    private users: any = {};

    isloading = false;
    saving = false;
    /** Motif d'un chargement manqué : sans lui, l'écran resterait muet. */
    erreur = '';

    requetes: RecordRequeteRow[] = [];
    /** Partenaire choisi : commande la liste des requêtes proposées ensuite. */
    plateformeUid = '';
    requeteUid = '';

    /** Filtre sur l'objet externe, proposé seulement s'il y en a plusieurs. */
    remoteId = '';
    searchValue = '';

    /** Champs de la requête choisie, après filtres. */
    champs: ChampExterne[] = [];

    /** Aide à la saisie du champ interne (liste `datalist` du navigateur). */
    suggestions = CHAMPS_INTERNES;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.charger();
    }

    charger(): void {
        this.isloading = true;
        this.erreur = '';

        this.httService.getData(RECORDS_URL, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res?.body?.status || res?.body?.success) {
                    this.requetes = (res.body.data || []).map((e: any) => mapRecordRequete(e));
                    // RIEN n'est présélectionné : l'écran commence par la
                    // question qu'il pose (« chez quel partenaire ? »), et une
                    // requête choisie d'office ferait prendre pour acquis un
                    // contexte que l'utilisateur n'a pas désigné.
                    this.plateformeUid = '';
                    this.requeteUid = '';
                    this.remoteId = '';
                    this.filtrer();
                } else {
                    this.erreur = res?.body?.message || 'Chargement des correspondances impossible.';
                }
            })
            .catch((err: any) => {
                this.isloading = false;
                this.erreur = messageErreur(err, 'Chargement des correspondances impossible.');
            });
    }

    /** La requête actuellement affichée. */
    get requete(): RecordRequeteRow | undefined {
        return this.requetes.find(r => r.uid === this.requeteUid);
    }

    /**
     * Plateformes proposées, déduites des requêtes reçues.
     *
     * Pas d'appel à l'endpoint des plateformes : la réponse porte déjà
     * l'authentification complète de chaque requête, et n'en lister que
     * celles-là évite de proposer un partenaire dont il n'y a rien à traduire.
     */
    get plateformeOptions(): { value: string; label: string }[] {
        const vues = new Map<string, string>();
        for (const r of this.requetes) {
            if (r.plateforme_uid && !vues.has(r.plateforme_uid)) {
                vues.set(r.plateforme_uid, r.plateforme_nom || 'Plateforme sans nom');
            }
        }
        return [...vues].map(([value, label]) => ({value, label}));
    }

    /** Requêtes du partenaire choisi. */
    get requetesDuPartenaire(): RecordRequeteRow[] {
        return this.requetes.filter(r => r.plateforme_uid === this.plateformeUid);
    }

    /**
     * Options du sélecteur. L'avancement figure dans le libellé : c'est la
     * seule façon de voir, sans ouvrir chaque requête, ce qui reste à faire.
     */
    get requeteOptions(): { value: string; label: string }[] {
        return this.requetesDuPartenaire.map(r => ({
            value: r.uid,
            label: `${r.name || 'Sans nom'} — ${this.nbAssocies(r)}/${r.champs.length} associés`,
        }));
    }

    nbAssocies(r: RecordRequeteRow): number {
        return r.champs.filter(c => c.payload_interne.trim()).length;
    }

    /** Objets externes présents dans la requête choisie. */
    get remoteIds(): string[] {
        const valeurs = (this.requete?.champs || []).map(c => c.remote_id).filter(v => v);
        return [...new Set(valeurs)];
    }

    get total(): number {
        return this.requete?.champs.length || 0;
    }

    get associes(): number {
        return this.requete ? this.nbAssocies(this.requete) : 0;
    }

    get progression(): number {
        return this.total ? Math.round((this.associes / this.total) * 100) : 0;
    }

    /** Lignes réellement changées depuis le chargement. */
    get modifies(): ChampExterne[] {
        return (this.requete?.champs || [])
            .filter(c => c.payload_interne.trim() !== c.initial.trim());
    }

    /**
     * Changer de partenaire vide la requête : garder celle du partenaire
     * précédent afficherait des champs qui ne le concernent pas, et en choisir
     * une d'office déciderait à la place de l'utilisateur.
     */
    choisirPlateforme(uid: string): void {
        if (this.plateformeUid === uid) return;
        this.plateformeUid = uid;
        this.choisirRequete('');
    }

    choisirRequete(uid: string): void {
        this.requeteUid = uid;
        this.remoteId = '';
        this.searchValue = '';
        this.filtrer();
    }

    choisirRemoteId(valeur: string): void {
        this.remoteId = this.remoteId === valeur ? '' : valeur;
        this.filtrer();
    }

    onSearch(valeur: string): void {
        this.searchValue = valeur;
        this.filtrer();
    }

    private filtrer(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.champs = (this.requete?.champs || [])
            .filter(c => !this.remoteId || c.remote_id === this.remoteId)
            .filter(c => !q
                || c.payload_externe.toLowerCase().includes(q)
                || c.payload_interne.toLowerCase().includes(q));
    }

    /** `trackBy` : sans lui, chaque frappe reconstruirait les champs de saisie. */
    suivreChamp(_: number, c: ChampExterne): string {
        return String(c.id);
    }

    /** Le partenaire porte souvent le même nom que nous : un clic suffit. */
    reprendreNom(c: ChampExterne): void {
        c.payload_interne = c.payload_externe;
    }

    vider(c: ChampExterne): void {
        c.payload_interne = '';
    }

    /**
     * Remplit d'un coup les champs dont le nom externe existe tel quel chez
     * nous. Ne touche QUE les lignes vides : une association déjà posée à la
     * main ne doit pas être écrasée par une correspondance automatique.
     */
    remplirIdentiques(): void {
        const connus = new Set(CHAMPS_INTERNES);
        let n = 0;
        for (const c of this.requete?.champs || []) {
            if (!c.payload_interne.trim() && connus.has(c.payload_externe)) {
                c.payload_interne = c.payload_externe;
                n++;
            }
        }
        this.filtrer();
        this.toast.info(
            n ? `${n} correspondance(s) évidente(s) remplie(s).` : 'Aucun nom identique à reprendre.',
            'Correspondances'
        );
    }

    /** Revient à l'état du serveur, sans recharger. */
    reinitialiser(): void {
        for (const c of this.requete?.champs || []) {
            c.payload_interne = c.initial;
        }
        this.filtrer();
    }

    enregistrer(): void {
        const requete = this.requete;
        const modifies = this.modifies;
        if (!requete || !modifies.length || this.saving) return;

        this.saving = true;
        this.httService.postData(
            ASSOCIATION_URL,
            corpsAssociation(requete.uid, modifies),
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.saving = false;
                if (res?.body?.status || res?.body?.success) {
                    // Le nouvel état de référence devient celui qu'on vient
                    // d'enregistrer : sans ça, les lignes resteraient marquées
                    // « modifiées » jusqu'au prochain rechargement.
                    modifies.forEach(c => c.initial = c.payload_interne.trim());
                    this.toast.success(
                        res.body.message || 'Correspondances enregistrées.',
                        'Succès'
                    );
                } else {
                    this.toast.error(res?.body?.message || "Échec de l'enregistrement.", 'Erreur');
                }
            })
            .catch((err: any) => {
                this.saving = false;
                this.toast.error(messageErreur(err, "Échec de l'enregistrement."), 'Erreur');
            });
    }
}
