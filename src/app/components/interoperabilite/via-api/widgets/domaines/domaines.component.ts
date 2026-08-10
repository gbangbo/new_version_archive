import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import moment from 'moment';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {environment} from '../../../../../../environments/environment';

interface DomaineRow {
    uid: string;
    domain: string;
    is_active: boolean;
    description: string;
    date: string;
    raw: any;
}

@Component({
    selector: 'app-domaines',
    imports: [CommonModule, FormsModule, NzSwitchModule, FeatherIconComponent],
    templateUrl: './domaines.component.html',
    styleUrl: './domaines.component.scss',
})
export class DomainesComponent implements OnInit {

    private users: any = [];
    isloading = false;
    searchValue = '';

    private allRows: DomaineRow[] = [];
    rows: DomaineRow[] = [];

    showModal = false;
    isEdit = false;
    editUid = '';
    saving = false;
    modalError = '';
    form: { domain: string; description: string; is_active: boolean } = {domain: '', description: '', is_active: true};

    togglingUid: string | null = null;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadDomaines();
    }

    loadDomaines(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        this.httService.getData(
            `${environment.api_url}api/:io-allowed-domains?uiddomain=`,
            false, this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private mapRow(e: any): DomaineRow {
        const dateVal = e?.created_at || e?.date_en || '';
        return {
            uid: e?.uid || e?.uiddomain || e?.iddomain || '',
            domain: e?.domain || e?.domaine || '',
            is_active: e?.is_active ?? e?.actif ?? e?.active ?? true,
            description: e?.description || '',
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
            ? this.allRows.filter(r => r.domain.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
            : [...this.allRows];
    }

    openCreate(): void {
        this.isEdit = false;
        this.editUid = '';
        this.form = {domain: '', description: '', is_active: true};
        this.modalError = '';
        this.showModal = true;
    }

    openEdit(row: DomaineRow): void {
        this.isEdit = true;
        this.editUid = row.uid;
        this.form = {domain: row.domain, description: row.description, is_active: row.is_active};
        this.modalError = '';
        this.showModal = true;
    }

    closeModal(): void {
        if (this.saving) return;
        this.showModal = false;
    }

    submit(): void {
        this.modalError = '';
        if (!this.form.domain.trim()) {
            this.modalError = 'Veuillez saisir le domaine.';
            return;
        }
        const payload: any = {
            action: this.isEdit ? 2 : 1,
            uiddomain: this.isEdit ? this.editUid : '',
            domain: this.form.domain.trim(),
            is_active: !!this.form.is_active,
            description: this.form.description.trim(),
        };
        this.saving = true;
        this.httService.postData(`${environment.api_url}api/:io-allowed-domains`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.saving = false;
                if (res.body.status || res.body.success) {
                    this.toast.success(res.body.message || (this.isEdit ? 'Domaine modifié.' : 'Domaine ajouté.'), 'Succès');
                    this.showModal = false;
                    this.loadDomaines();
                } else {
                    this.modalError = res.body.message || 'Échec de l\'enregistrement.';
                }
            })
            .catch((err: any) => {
                this.saving = false;
                this.modalError = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    toggleActive(row: DomaineRow): void {
        this.togglingUid = row.uid;
        const payload = {
            action: 2, uiddomain: row.uid, domain: row.domain,
            is_active: !row.is_active, description: row.description,
        };
        this.httService.postData(`${environment.api_url}api/:io-allowed-domains`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.togglingUid = null;
                if (res.body.status || res.body.success) {
                    row.is_active = !row.is_active;
                    this.toast.success(row.is_active ? 'Domaine activé.' : 'Domaine désactivé.', 'Succès');
                } else {
                    this.toast.error(res.body.message || 'Opération échouée.', 'Erreur');
                }
            })
            .catch(() => {
                this.togglingUid = null;
                this.toast.error('Une erreur est survenue.', 'Erreur');
            });
    }

    async remove(row: DomaineRow): Promise<void> {
        const result = await Swal.fire({
            html: `<div style="margin-top:8px;"><p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px;">Supprimer ce domaine ?</p><p style="font-size:13px;color:#64748B;margin:0;">« <strong>${row.domain}</strong> » sera définitivement supprimé.</p></div>`,
            icon: 'warning', showCancelButton: true,
            confirmButtonText: 'Oui, supprimer', cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444', cancelButtonColor: '#94A3B8', reverseButtons: true,
        });
        if (!result.isConfirmed) return;
        const payload = {
            action: 3, uiddomain: row.uid, domain: row.domain,
            is_active: row.is_active, description: row.description,
        };
        this.httService.postData(`${environment.api_url}api/:io-allowed-domains`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.toast.success('Domaine supprimé.', 'Succès');
                    this.loadDomaines();
                } else {
                    this.toast.error(res.body.message || 'Suppression échouée.', 'Erreur');
                }
            })
            .catch(() => {
                this.toast.error('Une erreur est survenue.', 'Erreur');
            });
    }
}
