import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Select2Module} from 'ng-select2-component';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import {SqlEditorComponent} from '../sql-editor/sql-editor.component';
import {SqlHighlightPipe} from '../sql-editor/sql-highlight.pipe';
import {JsonEditorComponent} from '../../../shared/json-editor/json-editor.component';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import moment from 'moment';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {environment} from '../../../../../../environments/environment';

interface QueryRow {
    uid: string;
    name: string;
    connection: number | string;
    connectionName: string;
    connectionDb: string;
    description: string;
    query: string;
    params: any;
    is_active: boolean;
    date: string;
    raw: any;
}

@Component({
    selector: 'app-requetes',
    imports: [CommonModule, FormsModule, Select2Module, NzSwitchModule, FeatherIconComponent, SqlEditorComponent, SqlHighlightPipe, JsonEditorComponent],
    templateUrl: './requetes.component.html',
    styleUrl: './requetes.component.scss',
})
export class RequetesComponent implements OnInit {

    private users: any = [];
    isloading = false;
    searchValue = '';

    private allRows: QueryRow[] = [];
    rows: QueryRow[] = [];

    // ── Pagination (comme l'accueil) ──────────────────────────────────
    pageActuelle = 1;
    pageSize = 10;
    pageSizeOptions = [10, 20, 50];

    // ── Panneau latéral (requête complète) ────────────────────────────
    drawerRow: QueryRow | null = null;

    // Connexions (pour le select) — indexées par id numérique
    dbLogos: { [k: string]: string } = {
        postgresql: 'assets/images/db/postgresql-logo-svgrepo-com.svg',
        mysql: 'assets/images/db/mysql-svgrepo-com.svg',
        mssql: 'assets/images/db/microsoft-sql-server-logo-svgrepo-com.svg',
        oracle: 'assets/images/db/oracle-svgrepo-com.svg',
    };
    connexions: any[] = [];
    connexionOptions: { value: any; label: string }[] = [];
    private connMap: { [id: string]: { name: string; db: string } } = {};

    // ── Modal ─────────────────────────────────────────────────────────
    showModal = false;
    isEdit = false;
    editUid = '';
    saving = false;
    modalError = '';
    form: {
        name: string;
        connection: any;
        description: string;
        query: string;
        params: string; // JSON en texte
        is_active: boolean;
    } = this.emptyForm();

    togglingUid: string | null = null;
    jsonParamsValid = true;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadConnexions();
        this.loadQueries();
    }

    private emptyForm() {
        return {name: '', connection: '', description: '', query: '', params: '', is_active: true};
    }

    // ── Connexions ────────────────────────────────────────────────────
    private loadConnexions(): void {
        this.httService.getData(
            `${environment.api_url}api/:io-database-connections?idconnection=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.connexions = res.body.data || [];
                    this.connexionOptions = this.connexions.map((c: any) => {
                        const id = c?.id ?? c?.connection ?? c?.uid;
                        const logo = this.dbLogos[c?.db_type] || '';
                        this.connMap[String(id)] = {name: c?.name || '', db: c?.db_type || ''};
                        return {
                            value: id,
                            label: `${logo ? `<img src="${logo}" class="rqopt-img" alt=""/>` : ''}${c?.name || 'Connexion'}`,
                        };
                    });
                    // rafraîchit les libellés des lignes déjà chargées
                    this.applyFilter();
                }
            })
            .catch(() => {
            });
    }

    connLogo(db: string): string {
        return this.dbLogos[db] || '';
    }

    // ── Chargement des requêtes ───────────────────────────────────────
    loadQueries(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        this.httService.getData(
            `${environment.api_url}api/:io-saved-queries?idquery=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log('io-saved-queries ===', res.body);
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private mapRow(e: any): QueryRow {
        const dateVal = e?.created_at || e?.date_en || '';
        const connId = e?.connection ?? e?.idconnection ?? '';
        const cm = this.connMap[String(connId)];
        return {
            uid: e?.uid || e?.idquery || '',
            name: e?.name || '',
            connection: connId,
            connectionName: cm?.name || e?.dataconnection?.name || e?.connection_name || (connId ? `#${connId}` : '—'),
            connectionDb: cm?.db || e?.dataconnection?.db_type || '',
            description: e?.description || '',
            query: e?.query || '',
            params: e?.params || {},
            is_active: e?.is_active ?? e?.actif ?? e?.active ?? true,
            date: dateVal ? moment(dateVal).format('DD/MM/YYYY HH:mm') : '',
            raw: e,
        };
    }

    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    // ── Pagination ────────────────────────────────────────────────────
    get totalPages(): number {
        return Math.ceil(this.rows.length / this.pageSize) || 1;
    }

    get pagedRows(): QueryRow[] {
        const start = (this.pageActuelle - 1) * this.pageSize;
        return this.rows.slice(start, start + this.pageSize);
    }

    get visiblePages(): (number | string)[] {
        const total = this.totalPages;
        const current = this.pageActuelle;
        const delta = 1;
        const range: number[] = [];
        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) range.push(i);
        }
        const result: (number | string)[] = [];
        let prev = 0;
        for (const p of range) {
            if (prev) {
                if (p - prev === 2) result.push(prev + 1);
                else if (p - prev !== 1) result.push('…');
            }
            result.push(p);
            prev = p;
        }
        return result;
    }

    goToPage(page: number): void {
        if (page < 1 || page > this.totalPages) return;
        this.pageActuelle = page;
    }

    onPageSizeChange(size: number): void {
        this.pageSize = Number(size);
        this.pageActuelle = 1;
    }

    // ── Panneau latéral ───────────────────────────────────────────────
    openDrawer(row: QueryRow): void {
        this.drawerRow = row;
    }

    closeDrawer(): void {
        this.drawerRow = null;
    }

    copyQuery(): void {
        const q = this.drawerRow?.query || '';
        if (!q) return;
        navigator.clipboard?.writeText(q).then(
            () => this.toast.success('Requête copiée.', 'Succès'),
            () => this.toast.error('Copie impossible.', 'Erreur'),
        );
    }

    private applyFilter(): void {
        // recalcule les libellés de connexion si la map a évolué
        this.allRows.forEach(r => {
            const cm = this.connMap[String(r.connection)];
            if (cm) { r.connectionName = cm.name; r.connectionDb = cm.db; }
        });
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r =>
                r.name.toLowerCase().includes(q) ||
                r.query.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q) ||
                r.connectionName.toLowerCase().includes(q))
            : [...this.allRows];
        this.pageActuelle = 1;
    }

    // ── Modal ─────────────────────────────────────────────────────────
    openCreate(): void {
        this.isEdit = false;
        this.editUid = '';
        this.form = this.emptyForm();
        this.modalError = '';
        this.showModal = true;
    }

    openEdit(row: QueryRow): void {
        this.isEdit = true;
        this.editUid = row.uid;
        this.form = {
            name: row.name,
            connection: row.connection,
            description: row.description,
            query: row.query,
            params: (row.params && Object.keys(row.params).length) ? JSON.stringify(row.params, null, 2) : '',
            is_active: row.is_active,
        };
        this.modalError = '';
        this.showModal = true;
    }

    closeModal(): void {
        if (this.saving) return;
        this.showModal = false;
    }

    private parseParams(): any {
        const raw = this.form.params.trim();
        if (!raw) return {};
        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    }

    submit(): void {
        this.modalError = '';
        if (!this.form.name.trim()) {
            this.modalError = 'Veuillez saisir le nom de la requête.';
            return;
        }
        if (this.form.connection === '' || this.form.connection === null || this.form.connection === undefined) {
            this.modalError = 'Veuillez sélectionner une connexion.';
            return;
        }
        if (!this.form.query.trim()) {
            this.modalError = 'Veuillez saisir la requête SQL.';
            return;
        }
        const params = this.parseParams();
        if (params === null) {
            this.modalError = 'Le champ « Paramètres » doit être un JSON valide.';
            return;
        }

        const payload: any = {
            action: this.isEdit ? 2 : 1,
            idquery: this.isEdit ? this.editUid : '',
            connection: Number(this.form.connection),
            name: this.form.name.trim(),
            description: this.form.description.trim(),
            query: this.form.query.trim(),
            params: params,
            is_active: !!this.form.is_active,
        };

        this.saving = true;
        this.httService.postData(`${environment.api_url}api/:io-saved-queries`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.saving = false;
                if (res.body.status || res.body.success) {
                    this.toast.success(res.body.message || (this.isEdit ? 'Requête modifiée.' : 'Requête ajoutée.'), 'Succès');
                    this.showModal = false;
                    this.loadQueries();
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
    toggleActive(row: QueryRow): void {
        this.togglingUid = row.uid;
        const payload = {
            action: 2,
            idquery: row.uid,
            connection: Number(row.connection),
            name: row.name,
            description: row.description,
            query: row.query,
            params: row.params || {},
            is_active: !row.is_active,
        };
        this.httService.postData(`${environment.api_url}api/:io-saved-queries`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.togglingUid = null;
                if (res.body.status || res.body.success) {
                    row.is_active = !row.is_active;
                    this.toast.success(row.is_active ? 'Requête activée.' : 'Requête désactivée.', 'Succès');
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
    async remove(row: QueryRow): Promise<void> {
        const result = await Swal.fire({
            html: `
              <div style="margin-top:8px;">
                <p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px;">
                  Supprimer cette requête ?
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
            idquery: row.uid,
            connection: Number(row.connection),
            name: row.name,
            description: row.description,
            query: row.query,
            params: row.params || {},
            is_active: row.is_active,
        };
        this.httService.postData(`${environment.api_url}api/:io-saved-queries`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.toast.success('Requête supprimée.', 'Succès');
                    this.loadQueries();
                } else {
                    this.toast.error(res.body.message || 'Suppression échouée.', 'Erreur');
                }
            })
            .catch(() => {
                this.toast.error('Une erreur est survenue.', 'Erreur');
            });
    }
}
