import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Select2Module} from 'ng-select2-component';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import {JsonEditorComponent} from '../../../shared/json-editor/json-editor.component';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import moment from 'moment';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {environment} from '../../../../../../environments/environment';

interface ConnRow {
    uid: string;
    name: string;
    db_type: string;
    host: string;
    port: number | string;
    dbname: string;
    user: string;
    driver: string;
    is_active: boolean;
    extra_params: any;
    date: string;
    raw: any;
}

@Component({
    selector: 'app-connexions',
    imports: [CommonModule, FormsModule, Select2Module, NzSwitchModule, FeatherIconComponent, JsonEditorComponent],
    templateUrl: './connexions.component.html',
    styleUrl: './connexions.component.scss',
})
export class ConnexionsComponent implements OnInit {

    private users: any = [];
    isloading = false;
    searchValue = '';

    private allRows: ConnRow[] = [];
    rows: ConnRow[] = [];

    // Types de base supportés (cf. doc API)
    dbTypes = [
        {value: 'postgresql', label: 'PostgreSQL'},
        {value: 'mysql', label: 'MySQL'},
        {value: 'mssql', label: 'SQL Server'},
        {value: 'oracle', label: 'Oracle'},
    ];

    // Logos SVG par SGBD (fichiers déposés dans public/assets/images/db)
    dbLogos: { [k: string]: string } = {
        postgresql: 'assets/images/db/postgresql-logo-svgrepo-com.svg',
        mysql: 'assets/images/db/mysql-svgrepo-com.svg',
        mssql: 'assets/images/db/microsoft-sql-server-logo-svgrepo-com.svg',
        oracle: 'assets/images/db/oracle-svgrepo-com.svg',
    };

    dbLogo(value: string): string {
        return this.dbLogos[value] || '';
    }

    // Options select2 : libellé HTML avec logo du SGBD
    dbOptions = this.dbTypes.map(t => ({
        value: t.value,
        label: `<img src="${this.dbLogos[t.value]}" class="dbopt-img" alt=""/>${t.label}`,
    }));

    // ── Modal ─────────────────────────────────────────────────────────
    showModal = false;
    isEdit = false;
    editUid = '';
    saving = false;
    modalError = '';
    form: {
        name: string;
        db_type: string;
        host: string;
        port: number | string;
        dbname: string;
        user: string;
        password: string;
        driver: string;
        extra_params: string; // JSON en texte dans le formulaire
        is_active: boolean;
    } = this.emptyForm();

    togglingUid: string | null = null;
    jsonExtraValid = true;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadConnexions();
    }

    private emptyForm() {
        return {
            name: '', db_type: 'postgresql', host: '', port: '', dbname: '',
            user: '', password: '', driver: '', extra_params: '', is_active: true,
        };
    }

    dbLabel(v: string): string {
        return this.dbTypes.find(t => t.value === v)?.label || (v || '—');
    }

    // ── Chargement ────────────────────────────────────────────────────
    loadConnexions(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        this.httService.getData(
            `${environment.api_url}api/:io-database-connections?idconnection=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log('io-database-connections ===', res.body);
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private mapRow(e: any): ConnRow {
        const dateVal = e?.created_at || e?.date_en || '';
        return {
            uid: e?.uid || e?.idconnection || '',
            name: e?.name || e?.nom || '',
            db_type: e?.db_type || '',
            host: e?.host || '',
            port: e?.port ?? '',
            dbname: e?.dbname || '',
            user: e?.user || '',
            driver: e?.driver || '',
            is_active: e?.is_active ?? e?.actif ?? e?.active ?? true,
            extra_params: e?.extra_params || {},
            date: dateVal ? moment(dateVal).format('DD/MM/YYYY HH:mm') : '',
            raw: e,
        };
    }

    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r =>
                r.name.toLowerCase().includes(q) ||
                r.host.toLowerCase().includes(q) ||
                r.dbname.toLowerCase().includes(q) ||
                r.db_type.toLowerCase().includes(q))
            : [...this.allRows];
    }

    // ── Modal ─────────────────────────────────────────────────────────
    openCreate(): void {
        this.isEdit = false;
        this.editUid = '';
        this.form = this.emptyForm();
        this.modalError = '';
        this.showModal = true;
    }

    openEdit(row: ConnRow): void {
        this.isEdit = true;
        this.editUid = row.uid;
        this.form = {
            name: row.name,
            db_type: row.db_type || 'postgresql',
            host: row.host,
            port: row.port,
            dbname: row.dbname,
            user: row.user,
            password: '',
            driver: row.driver,
            extra_params: (row.extra_params && Object.keys(row.extra_params).length)
                ? JSON.stringify(row.extra_params, null, 2) : '',
            is_active: row.is_active,
        };
        this.modalError = '';
        this.showModal = true;
    }

    closeModal(): void {
        if (this.saving) return;
        this.showModal = false;
    }

    private parseExtra(): any {
        const raw = this.form.extra_params.trim();
        if (!raw) return {};
        try {
            return JSON.parse(raw);
        } catch {
            return null; // signale une erreur de format
        }
    }

    submit(): void {
        this.modalError = '';
        if (!this.form.name.trim()) {
            this.modalError = 'Veuillez saisir le nom de la connexion.';
            return;
        }
        if (!this.form.host.trim()) {
            this.modalError = 'Veuillez saisir l\'hôte.';
            return;
        }
        const extra = this.parseExtra();
        if (extra === null) {
            this.modalError = 'Le champ « Paramètres additionnels » doit être un JSON valide.';
            return;
        }

        const payload: any = {
            action: this.isEdit ? 2 : 1,
            idconnection: this.isEdit ? this.editUid : '',
            name: this.form.name.trim(),
            db_type: this.form.db_type,
            host: this.form.host.trim(),
            port: this.form.port !== '' ? Number(this.form.port) : null,
            dbname: this.form.dbname.trim(),
            user: this.form.user.trim(),
            driver: this.form.driver.trim(),
            extra_params: extra,
            is_active: !!this.form.is_active,
        };
        // Le mot de passe n'est envoyé que s'il est renseigné (en édition, vide = inchangé)
        if (this.form.password.trim()) payload.password = this.form.password;
        this.saving = true;
        this.httService.postData(`${environment.api_url}api/:io-database-connections`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.saving = false;
                if (res.body.status || res.body.success) {
                    this.toast.success(res.body.message || (this.isEdit ? 'Connexion modifiée.' : 'Connexion ajoutée.'), 'Succès');
                    this.showModal = false;
                    this.loadConnexions();
                } else {
                    this.modalError = res.body.message || 'Échec de l\'enregistrement.';
                }
            })
            .catch((err: any) => {
                this.saving = false;
                this.modalError = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    // ── Activer / désactiver (action 2) ───────────────────────────────
    toggleActive(row: ConnRow): void {
        this.togglingUid = row.uid;
        const payload = {
            action: 2,
            idconnection: row.uid,
            name: row.name,
            db_type: row.db_type,
            host: row.host,
            port: row.port !== '' ? Number(row.port) : null,
            dbname: row.dbname,
            user: row.user,
            driver: row.driver,
            extra_params: row.extra_params || {},
            is_active: !row.is_active,
        };
        this.httService.postData(`${environment.api_url}api/:io-database-connections`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.togglingUid = null;
                if (res.body.status || res.body.success) {
                    row.is_active = !row.is_active;
                    this.toast.success(row.is_active ? 'Connexion activée.' : 'Connexion désactivée.', 'Succès');
                } else {
                    this.toast.error(res.body.message || 'Opération échouée.', 'Erreur');
                }
            })
            .catch(() => {
                this.togglingUid = null;
                this.toast.error('Une erreur est survenue.', 'Erreur');
            });
    }

    // ── Suppression (action 3) ────────────────────────────────────────
    async remove(row: ConnRow): Promise<void> {
        const result = await Swal.fire({
            html: `
              <div style="margin-top:8px;">
                <p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px;">
                  Supprimer cette connexion ?
                </p>
                <p style="font-size:13px;color:#64748B;margin:0;">
                  « <strong>${row.name}</strong> » sera définitivement supprimée.
                </p>
              </div>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
        });
        if (!result.isConfirmed) return;

        const payload = {
            action: 3,
            idconnection: row.uid,
            name: row.name,
            db_type: row.db_type,
            host: row.host,
            port: row.port !== '' ? Number(row.port) : null,
            dbname: row.dbname,
            user: row.user,
            driver: row.driver,
            extra_params: row.extra_params || {},
            is_active: row.is_active,
        };
        this.httService.postData(`${environment.api_url}api/:io-database-connections`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.toast.success('Connexion supprimée.', 'Succès');
                    this.loadConnexions();
                } else {
                    this.toast.error(res.body.message || 'Suppression échouée.', 'Erreur');
                }
            })
            .catch(() => {
                this.toast.error('Une erreur est survenue.', 'Erreur');
            });
    }
}
