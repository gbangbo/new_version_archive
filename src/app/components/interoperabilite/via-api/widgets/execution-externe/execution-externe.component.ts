import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Select2Module} from 'ng-select2-component';
import {ToastrService} from 'ngx-toastr';

import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {environment} from '../../../../../../environments/environment';
import {
    ecrireJson, emplacementsDe, EXECUTION_URL, lireJson, mapPlateforme, mapRequete,
    messageErreur,
    METHODES_HTTP, PLATEFORME_URL, PlateformeRow, PUBLICATIONS, REQUETE_URL, RequeteRow,
} from '../io-externe-api';

interface Choix {
    label: string;
    value: string;
}

@Component({
    selector: 'app-execution-externe',
    imports: [CommonModule, FormsModule, Select2Module, FeatherIconComponent],
    templateUrl: './execution-externe.component.html',
    styleUrl: './execution-externe.component.scss',
})
export class ExecutionExterneComponent implements OnInit {

    private users: any = {};

    plateformes: PlateformeRow[] = [];
    requetes: RequeteRow[] = [];
    /** Requêtes reçues avant le filtre sur `is_active` : sert à expliquer un vide. */
    totalRequetes = 0;
    methodes = METHODES_HTTP;
    publications = PUBLICATIONS;

    /** Listes du plan de classement, chargées à la demande. */
    rayons: Choix[] = [];
    boites: Choix[] = [];
    categories: Choix[] = [];
    typesDocument: Choix[] = [];
    chargementListes = false;
    /** Les listes dépendantes ont leur propre attente : boîtes et types. */
    chargementBoites = false;
    chargementTypes = false;

    /** Le classement ne concerne pas tous les appels : replié par défaut. */
    classementOuvert = false;

    /** Attente des deux listes de tête, chargées à l'ouverture de l'écran. */
    chargementPlateformes = false;
    chargementRequetes = false;
    /** Motif d'un chargement manqué : sans lui, l'écran resterait muet. */
    erreurChargement = '';

    fichier: File | null = null;

    form = {
        platform_auth_uid: '',
        platform_request_uid: '',
        url: '',
        method: 'GET',
        params: '',
        path_params: '',
        rayon_uid: '',
        boite_uid: '',
        categorie_uid: '',
        type_document_uid: '',
        publishe: 0,
    };

    executing = false;
    execError = '';
    hasResponse = false;
    responseText = '';
    responseMessage = '';
    statusCode: number | null = null;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.chargerPlateformes();
        this.chargerRequetes();
    }

    private get idsociete(): string {
        return this.users?.datasociete?.uid || '';
    }

    private chargerPlateformes(): void {
        this.chargementPlateformes = true;
        this.httService.getData(PLATEFORME_URL, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.chargementPlateformes = false;
                if (res?.body?.status || res?.body?.success) {
                    this.plateformes = (res.body.data || [])
                        .map((e: any) => mapPlateforme(e, () => ''))
                        .filter((p: PlateformeRow) => p.is_active);
                } else {
                    this.erreurChargement = res?.body?.message
                        || 'Chargement des plateformes impossible.';
                }
            })
            .catch((err: any) => {
                this.chargementPlateformes = false;
                this.erreurChargement = messageErreur(err, 'Chargement des plateformes impossible.');
            });
    }

    private chargerRequetes(): void {
        this.chargementRequetes = true;
        this.httService.getData(REQUETE_URL, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.chargementRequetes = false;
                if (res?.body?.status || res?.body?.success) {
                    const toutes: RequeteRow[] = (res.body.data || [])
                        .map((e: any) => mapRequete(e, () => ''));
                    this.totalRequetes = toutes.length;
                    this.requetes = toutes.filter(r => r.is_active);
                } else {
                    this.erreurChargement = res?.body?.message
                        || 'Chargement des requêtes enregistrées impossible.';
                }
            })
            .catch((err: any) => {
                this.chargementRequetes = false;
                this.erreurChargement = messageErreur(err, 'Chargement des requêtes enregistrées impossible.');
            });
    }

    /** Relance les deux listes après un échec, sans recharger l'écran. */
    rechargerListes(): void {
        this.erreurChargement = '';
        this.chargerPlateformes();
        this.chargerRequetes();
    }

    /**
     * Seules les requêtes de la plateforme choisie ont un sens ici.
     *
     * Exception : celles dont le back ne renvoie AUCUN lien de plateforme. Les
     * écarter les rendrait définitivement inatteignables — on les propose donc,
     * en les signalant, plutôt que d'afficher un sélecteur vide sur des requêtes
     * pourtant bien enregistrées.
     */
    get requetesDisponibles(): RequeteRow[] {
        if (!this.form.platform_auth_uid) return [];
        return this.requetes.filter(r => r.platform_auth_uid === this.form.platform_auth_uid
            || !r.platform_auth_uid);
    }

    /** Une requête sans plateforme connue : l'exécution part quand même, mais
     *  avec la plateforme choisie ici, qui n'est peut-être pas la sienne. */
    get requeteSansPlateforme(): boolean {
        const r = this.requeteChoisie;
        return !!r && !r.platform_auth_uid;
    }

    get plateformeOptions(): Choix[] {
        return this.plateformes.map(p => ({value: p.uid, label: p.name}));
    }

    get requeteOptions(): Choix[] {
        return this.requetesDisponibles.map(r => ({value: r.uid, label: r.name}));
    }

    get placeholderPlateforme(): string {
        return this.chargementPlateformes ? 'Chargement…' : 'Choisir une plateforme';
    }

    /** Dit à l'utilisateur pourquoi la liste des requêtes est vide ou fermée. */
    get placeholderRequete(): string {
        if (this.chargementRequetes) return 'Chargement…';
        if (!this.form.platform_auth_uid) return "Choisir une plateforme d'abord";
        return "Aucune — saisir l'URL";
    }

    /**
     * Explique un sélecteur vide alors que des requêtes existent bien.
     *
     * Trois vides différents, trois corrections différentes : rien d'enregistré,
     * tout désactivé, ou des requêtes rattachées à une autre plateforme.
     */
    get aideRequetes(): string {
        if (this.chargementRequetes || !this.form.platform_auth_uid) return '';
        if (this.requetesDisponibles.length) return '';
        if (!this.totalRequetes) return "Aucune requête enregistrée. Créez-en une dans l'étape « Requêtes ».";
        if (!this.requetes.length) {
            return `Les ${this.totalRequetes} requêtes enregistrées sont désactivées. `
                + 'Activez-en une dans l\'étape « Requêtes ».';
        }
        return "Aucune des requêtes enregistrées n'est rattachée à cette plateforme.";
    }

    get requeteChoisie(): RequeteRow | null {
        return this.requetes.find(r => r.uid === this.form.platform_request_uid) || null;
    }

    /** Emplacements à remplir : ceux de la requête choisie, ou de l'URL saisie. */
    get emplacements(): string[] {
        return emplacementsDe(this.requeteChoisie?.target_url || this.form.url);
    }

    surChangementPlateforme(uid: string): void {
        this.form.platform_auth_uid = uid || '';
        // La requête retenue appartenait peut-être à l'autre plateforme.
        this.surChangementRequete('');
    }

    /**
     * Reprend les valeurs par défaut de la requête comme point de départ.
     *
     * C'est bien un point de départ : à l'exécution, les valeurs envoyées
     * remplacent celles enregistrées portant le même nom. On les affiche donc
     * pour qu'on voie ce qui partira, et qu'on puisse l'ajuster.
     */
    surChangementRequete(uid: string): void {
        this.form.platform_request_uid = uid || '';
        const r = this.requeteChoisie;
        this.execError = '';
        if (!r) {
            this.form.params = '';
            this.form.path_params = '';
            return;
        }
        this.form.method = r.method;
        this.form.params = ecrireJson(r.default_params);
        this.form.path_params = ecrireJson(r.default_path_params);
    }

    formater(champ: 'params' | 'path_params'): void {
        const valeur = lireJson(this.form[champ]);
        if (valeur === null) {
            this.execError = 'Ce champ doit être un objet JSON valide.';
            return;
        }
        this.execError = '';
        this.form[champ] = ecrireJson(valeur);
    }

    // ── Plan de classement ───────────────────────────────────────────────
    /**
     * Chargé seulement quand on déplie le classement : deux appels inutiles à
     * chaque ouverture de l'écran, pour une section rarement employée, ne se
     * justifient pas.
     */
    basculerClassement(): void {
        this.classementOuvert = !this.classementOuvert;
        if (this.classementOuvert && !this.rayons.length && !this.categories.length) {
            this.chargerListes();
        }
    }

    private chargerListes(): void {
        const token = this.users?.access_token || '';
        this.chargementListes = true;

        // Les boîtes ne sont PAS chargées ici : elles dépendent du rayon
        // (site → rayon → boîte). Les demander toutes sociétés confondues
        // donnerait une liste de codes sans contexte, où deux boîtes de rayons
        // différents se ressemblent.
        const rayons = this.httService.getData(
            `${environment.api_url}api/:saverayons?idsociete=${this.idsociete}&idrayon=&idsite=`,
            false, token
        ).toPromise();

        // Même raison pour les types de documents : ils dépendent de la
        // catégorie. Seules les deux listes de tête sont chargées d'emblée.
        // Les trois paramètres restent VIDES, comme dans creer-un-document
        // (`showSerie('', '', '')`). Filtrer sur la société ne renvoie rien :
        // les séries ne sont pas indexées de cette façon.
        const categories = this.httService.getData(
            `${environment.api_url}api/:save-categorie-plan-classement?idsociete=&idtype_document=&idcategories=`,
            false, token
        ).toPromise();

        Promise.all([rayons, categories])
            .then(([resRayons, resCategories]: any[]) => {
                this.chargementListes = false;

                if (resRayons?.body?.status) {
                    this.rayons = (resRayons.body.data || []).map((e: any) => ({
                        label: e.libelle_rayon,
                        value: e.uid,
                    }));
                }

                if (resCategories?.body?.status || resCategories?.body?.success) {
                    // Même libellé que dans creer-un-document : « code - nom ».
                    this.categories = (resCategories.body.data || []).map((e: any) => ({
                        label: `${e.code_categories || ''} ${e.code_categories ? '-' : ''} ${e?.name_categories}`,
                        value: e.uid,
                    }));
                }
            })
            .catch(() => {
                this.chargementListes = false;
                this.toast.error('Chargement du plan de classement impossible.', 'Erreur');
            });
    }

    /** Dit à l'utilisateur pourquoi la liste des boîtes est vide ou fermée. */
    get placeholderBoite(): string {
        if (this.chargementBoites) return 'Chargement…';
        return this.form.rayon_uid ? 'Choisir une boîte' : "Choisir un rayon d'abord";
    }

    /**
     * Le rayon commande la liste des boîtes. Changer de rayon vide la boîte
     * retenue : la conserver laisserait une boîte qui n'appartient plus au
     * rayon affiché, et le classement partirait au mauvais endroit.
     */
    surChangementRayon(uid: string): void {
        this.form.rayon_uid = uid || '';
        this.form.boite_uid = '';
        this.boites = [];
        if (!this.form.rayon_uid) return;

        this.chargementBoites = true;
        this.httService.getData(
            `${environment.api_url}api/:saveboites?idsociete=${this.idsociete}&idrayon=${this.form.rayon_uid}&idsite=`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.chargementBoites = false;
                if (res?.body?.status) {
                    this.boites = (res.body.data || []).map((e: any) => ({
                        label: e.code_boites,
                        value: e.uid,
                    }));
                }
            })
            .catch((err: any) => {
                this.chargementBoites = false;
                this.toast.error(messageErreur(err, 'Chargement des boîtes impossible.'), 'Erreur');
            });
    }

    /** Dit pourquoi la liste des types est vide ou fermée. */
    get placeholderType(): string {
        if (this.chargementTypes) return 'Chargement…';
        return this.form.categorie_uid ? 'Choisir un type' : "Choisir une catégorie d'abord";
    }

    /**
     * La catégorie commande la liste des types de documents.
     *
     * Comme pour rayon → boîte, changer de catégorie vide le type retenu : un
     * type qui n'appartient plus à la catégorie affichée classerait le document
     * au mauvais endroit, sans que rien ne le signale.
     */
    surChangementCategorie(uid: string): void {
        this.form.categorie_uid = uid || '';
        this.form.type_document_uid = '';
        this.typesDocument = [];
        if (!this.form.categorie_uid) return;

        this.chargementTypes = true;
        this.httService.getData(
            // Idem : `showTypeDoc('', '', catUid)` n'envoie que la catégorie.
            `${environment.api_url}api/:categories-type-documents`
            + `?idsociete=&idtype_document=&idcategories=${this.form.categorie_uid}`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.chargementTypes = false;
                if (res?.body?.status) {
                    this.typesDocument = this.aplatirTypes(res.body.data || []);
                }
            })
            .catch((err: any) => {
                this.chargementTypes = false;
                this.toast.error(messageErreur(err, 'Chargement des types impossible.'), 'Erreur');
            });
    }

    /**
     * L'API renvoie un arbre catégorie → types de documents. Filtrée sur une
     * catégorie, elle n'en contient qu'une : on ne garde que ses enfants.
     */
    private aplatirTypes(arbre: any[]): Choix[] {
        const resultat: Choix[] = [];

        (arbre || []).forEach((categorie: any) => {
            (categorie?.children || []).forEach((enfant: any) => {
                const type = enfant?.datastype_document;
                if (!type?.uid) return;
                resultat.push({value: type.uid, label: type.libelle_type_docs});
            });
        });

        return resultat;
    }

    // ── Fichier ──────────────────────────────────────────────────────────
    surFichier(evenement: any): void {
        const liste: FileList = evenement?.target?.files;
        this.fichier = liste && liste.length ? liste[0] : null;
        // Sans cette remise à zéro, choisir deux fois le même fichier de suite
        // ne déclenche plus l'événement.
        if (evenement?.target) evenement.target.value = '';
    }

    retirerFichier(): void {
        this.fichier = null;
    }

    tailleLisible(octets: number): string {
        if (octets < 1024) return `${octets} o`;
        if (octets < 1024 * 1024) return `${(octets / 1024).toFixed(0)} Ko`;
        return `${(octets / 1024 / 1024).toFixed(1)} Mo`;
    }

    // ── Exécution ────────────────────────────────────────────────────────
    execute(): void {
        this.execError = '';

        if (!this.form.platform_auth_uid) {
            this.execError = 'Veuillez choisir la plateforme.';
            return;
        }
        // L'URL n'est facultative que si une requête enregistrée la fournit.
        if (!this.form.platform_request_uid && !this.form.url.trim()) {
            this.execError = 'Choisissez une requête enregistrée, ou saisissez une URL cible.';
            return;
        }

        const params = lireJson(this.form.params);
        const pathParams = lireJson(this.form.path_params);
        if (params === null || pathParams === null) {
            this.execError = 'Les paramètres doivent être des objets JSON valides.';
            return;
        }

        // Multipart : tout voyage en texte, y compris les objets — qui partent
        // donc en JSON sérialisé, contrairement aux requêtes enregistrées où ce
        // sont de vrais objets.
        const form = new FormData();
        form.append('platform_auth_uid', this.form.platform_auth_uid);
        if (this.form.platform_request_uid) {
            form.append('platform_request_uid', this.form.platform_request_uid);
        }
        if (this.form.url.trim()) {
            form.append('url', this.form.url.trim());
            form.append('method', this.form.method || 'GET');
        }
        if (Object.keys(params).length) form.append('params', JSON.stringify(params));
        if (Object.keys(pathParams).length) form.append('path_params', JSON.stringify(pathParams));
        if (this.fichier) form.append('lib_file', this.fichier, this.fichier.name);

        // L'utilisateur connecté : c'est lui qui répond du classement.
        if (this.users?.uid) form.append('user_uid', this.users.uid);

        if (this.classementOuvert) {
            if (this.form.boite_uid) form.append('boite_uid', this.form.boite_uid);
            if (this.form.categorie_uid) form.append('categorie_uid', this.form.categorie_uid);
            if (this.form.type_document_uid) {
                form.append('type_document_uid', this.form.type_document_uid);
            }
            form.append('publishe', String(this.form.publishe ?? 0));
        }

        this.executing = true;
        this.reinitialiserReponse();

        this.httService.postDataMultipart(EXECUTION_URL, form, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.executing = false;
                const b = res?.body || {};
                console.log("b=========", b)
                this.responseMessage = b?.message || '';
                this.statusCode = b?.status_code ?? b?.code ?? null;

                if (b.status || b.success) {
                    this.hasResponse = true;
                    this.responseText = this.enTexte(b.data ?? b);
                    this.toast.success(b.message || 'Requête exécutée.', 'Succès');
                } else {
                    this.execError = b.message || "Échec de l'exécution.";
                    // Même en échec, la réponse du partenaire est la seule chose
                    // qui permet de comprendre pourquoi.
                    if (b.data !== undefined) {
                        this.hasResponse = true;
                        this.responseText = this.enTexte(b.data);
                    }
                }
            })
            .catch((err: any) => {
                this.executing = false;
                this.execError = messageErreur(err, "Échec de l'exécution.");
            });
    }

    private enTexte(valeur: any): string {
        if (typeof valeur === 'string') return valeur;
        try {
            return JSON.stringify(valeur, null, 2);
        } catch {
            return String(valeur);
        }
    }

    private reinitialiserReponse(): void {
        this.hasResponse = false;
        this.responseText = '';
        this.responseMessage = '';
        this.statusCode = null;
    }

    copierReponse(): void {
        if (!this.responseText) return;
        navigator.clipboard?.writeText(this.responseText)
            .then(() => this.toast.success('Réponse copiée.', 'Succès'))
            .catch(() => this.toast.error('Copie impossible.', 'Erreur'));
    }
}
