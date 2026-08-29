import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {Select2Module} from 'ng-select2-component';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import moment from 'moment';

import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {
    ACTION_CREATION, ACTION_MODIFICATION, ACTION_SUPPRESSION, ecrireJson, emplacementsDe,
    lireJson, mapPlateforme, mapRequete, messageErreur, METHODES_HTTP, PLATEFORME_URL,
    PlateformeRow,
    REQUETE_URL, RequeteRow,
} from '../io-externe-api';

@Component({
    selector: 'app-requetes-externes',
    imports: [CommonModule, FormsModule, NzSwitchModule, Select2Module, FeatherIconComponent],
    templateUrl: './requetes-externes.component.html',
    styleUrl: './requetes-externes.component.scss',
})
export class RequetesExternesComponent implements OnInit {

    private users: any = {};
    isloading = false;
    searchValue = '';

    private allRows: RequeteRow[] = [];
    rows: RequeteRow[] = [];
    plateformes: PlateformeRow[] = [];

    methodes = METHODES_HTTP;

    showModal = false;
    isEdit = false;
    editUid = '';
    saving = false;
    modalError = '';
    togglingUid: string | null = null;

    form = {
        platform_auth_uid: '',
        name: '',
        target_url: '',
        method: 'GET',
        default_params: '',
        default_path_params: '',
        default_headers: '',
        response_data_path: '',
        is_active: true,
    };

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.chargerPlateformes();
        this.charger();
    }

    /** Sans plateformes, une requête n'a personne à qui s'adresser. */
    private chargerPlateformes(): void {
        this.httService.getData(PLATEFORME_URL, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) {
                    this.plateformes = (res.body.data || [])
                        .map((e: any) => mapPlateforme(e, v => this.formaterDate(v)));
                    // Les deux listes arrivent en parallèle : le diagnostic n'a
                    // de sens qu'une fois les deux là, d'où ce second appel.
                    if (this.allRows.length) this.diagnostiquerLienPlateforme();
                }
            })
            .catch(() => {
            });
    }

    charger(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];

        this.httService.getData(REQUETE_URL, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res?.body?.status || res?.body?.success) {
                    this.allRows = (res.body.data || [])
                        .map((e: any) => mapRequete(e, v => this.formaterDate(v)));
                    this.filtrer();
                    this.diagnostiquerLienPlateforme();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    /**
     * « Plateforme inconnue » n'est pas qu'un défaut d'affichage : sans ce lien,
     * la requête n'apparaît jamais dans le sélecteur de l'étape Exécution, qui
     * ne propose que les requêtes de la plateforme choisie. On expose donc en
     * console la forme réellement reçue, seul moyen de savoir sous quel nom le
     * back envoie l'uid.
     */
    private diagnostiquerLienPlateforme(): void {
        const sansLien = this.allRows.filter(r => !r.platform_auth_uid);
        if (sansLien.length) {
            // Les CLÉS d'abord : c'est sous ce nom-là que le lien devrait
            // arriver, et c'est la seule chose à corriger dans `mapRequete`.
            console.warn('[io-externe] Requêtes sans uid de plateforme reconnu.'
                + ' Champs réellement renvoyés par le GET :',
                sansLien.map(r => Object.keys(r.raw || {}).join(', ')));
            console.warn('[io-externe] Objets bruts :', sansLien.map(r => r.raw));
            return;
        }

        // Le lien existe, mais ne désigne aucune plateforme connue : les deux
        // endpoints ne renvoient alors pas le même identifiant.
        const orphelines = this.allRows.filter(r => !this.nomPlateforme(r.platform_auth_uid));
        if (orphelines.length && this.plateformes.length) {
            console.warn('[io-externe] Uid de plateforme sans correspondance :',
                orphelines.map(r => ({requete: r.name, cherche: r.platform_auth_uid})),
                '— plateformes connues :', this.plateformes.map(p => ({uid: p.uid, nom: p.name})));
        }
    }

    private formaterDate(valeur: string): string {
        return valeur ? moment(valeur).format('DD/MM/YYYY HH:mm') : '';
    }

    /** Options du sélecteur de plateforme, au format attendu par select2. */
    get plateformeOptions(): { value: string; label: string }[] {
        return this.plateformes.map(p => ({value: p.uid, label: p.name}));
    }

    /** Nom lisible d'une plateforme, l'uid seul n'apprenant rien à personne. */
    nomPlateforme(uid: string): string {
        return this.plateformes.find(p => p.uid === uid)?.name || '';
    }

    /** Emplacements nommés repérés dans l'URL saisie : /users/{user_id}. */
    get emplacements(): string[] {
        return emplacementsDe(this.form.target_url);
    }

    onSearch(valeur: string): void {
        this.searchValue = valeur;
        this.filtrer();
    }

    private filtrer(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r => r.name.toLowerCase().includes(q)
                || r.target_url.toLowerCase().includes(q)
                || this.nomPlateforme(r.platform_auth_uid).toLowerCase().includes(q))
            : [...this.allRows];
    }

    openCreate(): void {
        this.isEdit = false;
        this.editUid = '';
        this.modalError = '';
        this.form = {
            platform_auth_uid: this.plateformes[0]?.uid || '',
            name: '',
            target_url: '',
            method: 'GET',
            default_params: '',
            default_path_params: '',
            default_headers: '',
            response_data_path: '',
            is_active: true,
        };
        this.showModal = true;
    }

    openEdit(row: RequeteRow): void {
        this.isEdit = true;
        this.editUid = row.uid;
        this.modalError = '';
        this.form = {
            platform_auth_uid: row.platform_auth_uid,
            name: row.name,
            target_url: row.target_url,
            method: row.method,
            default_params: ecrireJson(row.default_params),
            default_path_params: ecrireJson(row.default_path_params),
            default_headers: ecrireJson(row.default_headers),
            response_data_path: row.response_data_path,
            is_active: row.is_active,
        };
        this.showModal = true;
    }

    closeModal(): void {
        if (this.saving) return;
        this.showModal = false;
    }

    formater(champ: 'default_params' | 'default_path_params' | 'default_headers'): void {
        const valeur = lireJson(this.form[champ]);
        if (valeur === null) {
            this.modalError = 'Ce champ doit être un objet JSON valide.';
            return;
        }
        this.modalError = '';
        this.form[champ] = ecrireJson(valeur);
    }

    submit(): void {
        this.modalError = '';

        if (!this.form.platform_auth_uid) {
            this.modalError = 'Veuillez choisir la plateforme concernée.';
            return;
        }
        if (!this.form.name.trim()) {
            this.modalError = 'Veuillez saisir le nom de la requête.';
            return;
        }
        if (!this.form.target_url.trim()) {
            this.modalError = "Veuillez saisir l'URL cible.";
            return;
        }

        // Les trois blocs JSON sont lus d'abord : une accolade oubliée ne doit
        // pas partir en enregistrement à moitié fait.
        const params = lireJson(this.form.default_params);
        const pathParams = lireJson(this.form.default_path_params);
        const headers = lireJson(this.form.default_headers);
        if (params === null || pathParams === null || headers === null) {
            this.modalError = 'Les paramètres et en-têtes par défaut doivent être des objets JSON valides.';
            return;
        }

        const payload: any = {
            action: this.isEdit ? ACTION_MODIFICATION : ACTION_CREATION,
            platform_auth_uid: this.form.platform_auth_uid,
            name: this.form.name.trim(),
            target_url: this.form.target_url.trim(),
            method: this.form.method || 'GET',
            default_params: params,
            default_path_params: pathParams,
            default_headers: headers,
            response_data_path: this.form.response_data_path.trim(),
            is_active: !!this.form.is_active,
        };
        // Une requête s'identifie par `platform_request_uid`, PAS par `uid` :
        // les deux endpoints de cette famille ne suivent pas la même convention.
        if (this.isEdit) payload.platform_request_uid = this.editUid;

        this.saving = true;
        this.httService.postData(REQUETE_URL, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.saving = false;
                console.log("res?.body ==", res?.body)
                if (res?.body?.status || res?.body?.success) {
                    this.toast.success(
                        res.body.message || (this.isEdit ? 'Requête modifiée.' : 'Requête créée.'),
                        'Succès'
                    );
                    this.showModal = false;
                    this.charger();
                } else {
                    this.modalError = res?.body?.message || "Échec de l'enregistrement.";
                }
            })
            .catch((err: any) => {
                console.log("err ===", err)
                this.saving = false;
                this.modalError = messageErreur(err, "Échec de l'enregistrement.");
            });
    }

    toggleActive(row: RequeteRow): void {
        this.togglingUid = row.uid;
        const payload = {
            action: ACTION_MODIFICATION,
            platform_request_uid: row.uid,
            platform_auth_uid: row.platform_auth_uid,
            name: row.name,
            target_url: row.target_url,
            method: row.method,
            default_params: row.default_params,
            default_path_params: row.default_path_params,
            default_headers: row.default_headers,
            response_data_path: row.response_data_path,
            is_active: !row.is_active,
        };

        this.httService.postData(REQUETE_URL, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.togglingUid = null;
                if (res?.body?.status || res?.body?.success) {
                    row.is_active = !row.is_active;
                    this.toast.success(row.is_active ? 'Requête activée.' : 'Requête désactivée.', 'Succès');
                } else {
                    this.toast.error(res?.body?.message || 'Opération échouée.', 'Erreur');
                }
            })
            .catch((err: any) => {
                this.togglingUid = null;
                this.toast.error(messageErreur(err, 'Opération échouée.'), 'Erreur');
            });
    }

    async remove(row: RequeteRow): Promise<void> {
        const reponse = await Swal.fire({
            html: `<div style="margin-top:8px;">
                     <p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px;">
                       Supprimer cette requête ?</p>
                     <p style="font-size:13px;color:#64748B;margin:0;">
                       « <strong>${this.echapper(row.name)}</strong> » sera définitivement supprimée.</p>
                   </div>`,
            icon: 'warning', showCancelButton: true,
            confirmButtonText: 'Oui, supprimer', cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444', cancelButtonColor: '#94A3B8', reverseButtons: true,
        });
        if (!reponse.isConfirmed) return;

        this.httService.postData(
            REQUETE_URL,
            {action: ACTION_SUPPRESSION, platform_request_uid: row.uid},
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) {
                    this.toast.success('Requête supprimée.', 'Succès');
                    this.charger();
                } else {
                    this.toast.error(res?.body?.message || 'Suppression échouée.', 'Erreur');
                }
            })
            .catch((err: any) => this.toast.error(messageErreur(err, 'Suppression échouée.'), 'Erreur'));
    }

    private echapper(texte: string): string {
        return (texte || '').replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
        }[c] as string));
    }
}
