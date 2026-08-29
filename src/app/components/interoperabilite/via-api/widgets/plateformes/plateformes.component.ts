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
    ACTION_CREATION, ACTION_MODIFICATION, ACTION_SUPPRESSION, ecrireJson, lireJson,
    mapPlateforme, messageErreur, METHODES_HTTP, PLATEFORME_URL, PlateformeRow,
} from '../io-externe-api';

@Component({
    selector: 'app-plateformes',
    imports: [CommonModule, FormsModule, NzSwitchModule, Select2Module, FeatherIconComponent],
    templateUrl: './plateformes.component.html',
    styleUrl: './plateformes.component.scss',
})
export class PlateformesComponent implements OnInit {

    private users: any = {};
    isloading = false;
    searchValue = '';

    private allRows: PlateformeRow[] = [];
    rows: PlateformeRow[] = [];

    methodes = METHODES_HTTP;

    showModal = false;
    isEdit = false;
    editUid = '';
    saving = false;
    modalError = '';
    togglingUid: string | null = null;

    /**
     * `authentication_payload` est en ÉCRITURE SEULE : le back le chiffre et ne
     * le renvoie jamais. À la modification, il est donc impossible de
     * pré-remplir ce champ — et il ne faut surtout pas essayer.
     *
     * `changerAcces` rend ce choix explicite : tant qu'il est à faux, la clé
     * n'est pas envoyée du tout, et les accès enregistrés restent en place.
     */
    changerAcces = false;

    form = {
        name: '',
        authentication_url: '',
        authentication_method: 'POST',
        authentication_payload: '',
        token_path: 'data.token',
        token_header_name: 'Authorization',
        token_prefix: 'Bearer',
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
        this.charger();
    }

    charger(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];

        this.httService.getData(PLATEFORME_URL, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res?.body?.status || res?.body?.success) {
                    this.allRows = (res.body.data || [])
                        .map((e: any) => mapPlateforme(e, v => this.formaterDate(v)));
                    this.filtrer();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private formaterDate(valeur: string): string {
        return valeur ? moment(valeur).format('DD/MM/YYYY HH:mm') : '';
    }

    onSearch(valeur: string): void {
        this.searchValue = valeur;
        this.filtrer();
    }

    private filtrer(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r => r.name.toLowerCase().includes(q)
                || r.authentication_url.toLowerCase().includes(q))
            : [...this.allRows];
    }

    openCreate(): void {
        this.isEdit = false;
        this.editUid = '';
        this.changerAcces = true;   // à la création, les accès sont obligatoires
        this.modalError = '';
        this.form = {
            name: '',
            authentication_url: '',
            authentication_method: 'POST',
            authentication_payload: ecrireJson({username: '', password: ''}),
            token_path: 'data.token',
            token_header_name: 'Authorization',
            token_prefix: 'Bearer',
            is_active: true,
        };
        this.showModal = true;
    }

    openEdit(row: PlateformeRow): void {
        this.isEdit = true;
        this.editUid = row.uid;
        this.changerAcces = false;
        this.modalError = '';
        this.form = {
            name: row.name,
            authentication_url: row.authentication_url,
            authentication_method: row.authentication_method,
            // Volontairement vide : le back ne renvoie jamais les accès.
            authentication_payload: '',
            token_path: row.token_path,
            token_header_name: row.token_header_name,
            token_prefix: row.token_prefix,
            is_active: row.is_active,
        };
        this.showModal = true;
    }

    closeModal(): void {
        if (this.saving) return;
        this.showModal = false;
    }

    formaterPayload(): void {
        const valeur = lireJson(this.form.authentication_payload);
        if (valeur === null) {
            this.modalError = 'Les accès doivent être un objet JSON valide.';
            return;
        }
        this.modalError = '';
        this.form.authentication_payload = ecrireJson(valeur);
    }

    submit(): void {
        this.modalError = '';

        if (!this.form.name.trim()) {
            this.modalError = 'Veuillez saisir le nom de la plateforme.';
            return;
        }
        if (!this.form.authentication_url.trim()) {
            this.modalError = "Veuillez saisir l'URL d'authentification.";
            return;
        }

        const payload: any = {
            action: this.isEdit ? ACTION_MODIFICATION : ACTION_CREATION,
            name: this.form.name.trim(),
            authentication_url: this.form.authentication_url.trim(),
            authentication_method: this.form.authentication_method || 'POST',
            token_path: this.form.token_path.trim() || 'data.token',
            token_header_name: this.form.token_header_name.trim() || 'Authorization',
            token_prefix: this.form.token_prefix.trim(),
            is_active: !!this.form.is_active,
        };
        if (this.isEdit) payload.uid = this.editUid;

        // Les accès ne partent QUE si l'utilisateur a demandé à les changer :
        // envoyer un objet vide écraserait ceux qui fonctionnent.
        if (!this.isEdit || this.changerAcces) {
            const acces = lireJson(this.form.authentication_payload);
            if (acces === null) {
                this.modalError = 'Les accès doivent être un objet JSON valide.';
                return;
            }
            if (!Object.keys(acces).length) {
                this.modalError = 'Veuillez saisir les accès à transmettre à la plateforme.';
                return;
            }
            payload.authentication_payload = acces;
        }

        this.saving = true;
        this.httService.postData(PLATEFORME_URL, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.saving = false;
                if (res?.body?.status || res?.body?.success) {
                    this.toast.success(
                        res.body.message || (this.isEdit ? 'Plateforme modifiée.' : 'Plateforme créée.'),
                        'Succès'
                    );
                    this.showModal = false;
                    this.charger();
                } else {
                    this.modalError = res?.body?.message || "Échec de l'enregistrement.";
                }
            })
            .catch((err: any) => {
                this.saving = false;
                this.modalError = messageErreur(err, "Échec de l'enregistrement.");
            });
    }

    /**
     * Bascule active/inactive. On renvoie la configuration complète SANS les
     * accès : ils ne sont pas concernés, et on n'a de toute façon pas moyen de
     * les relire pour les retransmettre.
     */
    toggleActive(row: PlateformeRow): void {
        this.togglingUid = row.uid;
        const payload = {
            action: ACTION_MODIFICATION,
            uid: row.uid,
            name: row.name,
            authentication_url: row.authentication_url,
            authentication_method: row.authentication_method,
            token_path: row.token_path,
            token_header_name: row.token_header_name,
            token_prefix: row.token_prefix,
            is_active: !row.is_active,
        };

        this.httService.postData(PLATEFORME_URL, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.togglingUid = null;
                if (res?.body?.status || res?.body?.success) {
                    row.is_active = !row.is_active;
                    this.toast.success(row.is_active ? 'Plateforme activée.' : 'Plateforme désactivée.', 'Succès');
                } else {
                    this.toast.error(res?.body?.message || 'Opération échouée.', 'Erreur');
                }
            })
            .catch((err: any) => {
                this.togglingUid = null;
                this.toast.error(messageErreur(err, 'Opération échouée.'), 'Erreur');
            });
    }

    async remove(row: PlateformeRow): Promise<void> {
        const reponse = await Swal.fire({
            html: `<div style="margin-top:8px;">
                     <p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px;">
                       Supprimer cette plateforme ?</p>
                     <p style="font-size:13px;color:#64748B;margin:0;">
                       « <strong>${this.echapper(row.name)}</strong> » et ses accès seront
                       définitivement supprimés. Les requêtes qui s'y rattachent
                       ne pourront plus être exécutées.</p>
                   </div>`,
            icon: 'warning', showCancelButton: true,
            confirmButtonText: 'Oui, supprimer', cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444', cancelButtonColor: '#94A3B8', reverseButtons: true,
        });
        if (!reponse.isConfirmed) return;

        this.httService.postData(
            PLATEFORME_URL,
            {action: ACTION_SUPPRESSION, uid: row.uid},
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res?.body?.status || res?.body?.success) {
                    this.toast.success('Plateforme supprimée.', 'Succès');
                    this.charger();
                } else {
                    this.toast.error(res?.body?.message || 'Suppression échouée.', 'Erreur');
                }
            })
            .catch((err: any) => this.toast.error(messageErreur(err, 'Suppression échouée.'), 'Erreur'));
    }

    /** Le nom vient de l'utilisateur : jamais injecté brut dans un popup. */
    private echapper(texte: string): string {
        return (texte || '').replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
        }[c] as string));
    }
}
