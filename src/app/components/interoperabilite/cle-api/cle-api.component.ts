import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import moment from 'moment';
import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';

interface CleApiRow {
    uid: string;
    name: string;
    header_name: string;
    key: string;
    is_active: boolean;
    allowed_domains_uids: string[];
    domain_names: string[];
    description: string;
    date: string;
    // Affichage clé en clair (via show_key)
    revealed: boolean;
    revealedKey: string;
    revealing: boolean;
    raw: any;
}

@Component({
    selector: 'app-cle-api',
    imports: [CommonModule, FormsModule, NzTableModule, NzTagModule, NzToolTipModule, NzSelectModule, CardComponent, FeatherIconComponent],
    templateUrl: './cle-api.component.html',
    styleUrl: './cle-api.component.scss'
})
export class CleApiComponent implements OnInit {

    private users: any = [];
    isloading: boolean = false;
    searchValue: string = '';

    private allRows: CleApiRow[] = [];
    rows: CleApiRow[] = [];

    // Domaines autorisés (pour le multi-select)
    dataDomaines: { label: string; value: string }[] = [];
    private domainMap: { [uid: string]: string } = {};

    // ── Modal création / modification ─────────────────────────────────
    showModal: boolean = false;
    isEdit: boolean = false;
    editUid: string = '';
    saving: boolean = false;
    modalError: string = '';
    form: {
        name: string;
        header_name: string;
        key: string;
        is_active: boolean;
        allowed_domains_uids: string[];
        description: string;
    } = {name: '', header_name: 'X-API-KEY', key: '', is_active: true, allowed_domains_uids: [], description: ''};

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
        this.loadCles();
    }

    // ── Chargement des domaines (multi-select) ────────────────────────
    private loadDomaines(): void {
        this.httService.getData(
            `${environment.api_url}api/:io-allowed-domains?uiddomain=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.dataDomaines = (res.body.data || []).map((e: any) => {
                        const value = e?.uid || e?.uiddomain || e?.iddomain || '';
                        const label = e?.domain || e?.domaine || value;
                        this.domainMap[value] = label;
                        return {label, value};
                    }).filter((d: any) => d.value);
                }
            })
            .catch(() => {
            });
    }

    // ── Chargement des clés ────────────────────────────────────────────
    loadCles(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        this.httService.getData(
            `${environment.api_url}api/:io-api-keys?uidapikey=&show_key=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log('io-api-keys ===', res.body);
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private mapRow(e: any): CleApiRow {
        const dateVal = e?.created_at || e?.date_en || '';
        // Domaines : l'API renvoie allowed_domains_details (objets), sinon un simple tableau d'uids
        const rawDomains = e?.allowed_domains_details || e?.allowed_domains_uids || e?.allowed_domains || e?.dataalloweddomains || [];
        const domList = Array.isArray(rawDomains) ? rawDomains : [];
        const domUids: string[] = domList
            .map((d: any) => (typeof d === 'string' ? d : (d?.uid || d?.uiddomain || '')))
            .filter(Boolean);
        const domNames: string[] = domList
            .map((d: any) => (typeof d === 'string' ? (this.domainMap[d] || d) : (d?.domain || d?.domaine || d?.uid || '')))
            .filter(Boolean);
        return {
            uid: e?.uid || e?.uidapikey || e?.idapikey || '',
            name: e?.name || e?.nom || '',
            header_name: e?.header_name || 'X-API-KEY',
            key: e?.key || e?.key_masked || e?.masked_key || '••••••••',
            is_active: e?.is_active ?? e?.actif ?? e?.active ?? true,
            allowed_domains_uids: domUids,
            domain_names: domNames,
            description: e?.description || '',
            date: dateVal ? moment(dateVal).format('DD/MM/YYYY HH:mm') : '',
            revealed: false,
            revealedKey: '',
            revealing: false,
            raw: e,
        };
    }

    domainLabels(r: CleApiRow): string[] {
        // Libellés fournis par l'API (allowed_domains_details), sinon résolus via la map
        if (r.domain_names && r.domain_names.length) return r.domain_names;
        return (r.allowed_domains_uids || []).map(u => this.domainMap[u] || u);
    }

    // ── Recherche ─────────────────────────────────────────────────────
    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r =>
                r.name.toLowerCase().includes(q) ||
                r.header_name.toLowerCase().includes(q) ||
                r.description.toLowerCase().includes(q))
            : [...this.allRows];
    }

    // ── Révéler / masquer la clé (show_key=true) ──────────────────────
    toggleReveal(row: CleApiRow): void {
        if (row.revealed) {
            row.revealed = false;
            return;
        }
        if (row.revealedKey) {
            row.revealed = true;
            return;
        }
        row.revealing = true;
        this.httService.getData(
            `${environment.api_url}api/:io-api-keys?uidapikey=${row.uid}&show_key=true`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                row.revealing = false;
                const data = Array.isArray(res.body.data) ? res.body.data[0] : res.body.data;
                if ((res.body.status || res.body.success) && data) {
                    row.revealedKey = data?.key || data?.key_plain || row.key;
                    row.revealed = true;
                } else {
                    this.toast.error('Impossible d\'afficher la clé.', 'Erreur');
                }
            })
            .catch(() => {
                row.revealing = false;
                this.toast.error('Impossible d\'afficher la clé.', 'Erreur');
            });
    }

    copyKey(row: CleApiRow): void {
        const val = row.revealed ? row.revealedKey : row.key;
        if (!val) return;
        navigator.clipboard?.writeText(val).then(
            () => this.toast.success('Clé copiée.', 'Succès'),
            () => this.toast.error('Copie impossible.', 'Erreur'),
        );
    }

    // ── Modal ─────────────────────────────────────────────────────────
    openCreate(): void {
        this.isEdit = false;
        this.editUid = '';
        this.form = {name: '', header_name: 'X-API-KEY', key: '', is_active: true, allowed_domains_uids: [], description: ''};
        this.modalError = '';
        this.showModal = true;
    }

    openEdit(row: CleApiRow): void {
        this.isEdit = true;
        this.editUid = row.uid;
        this.form = {
            name: row.name,
            header_name: row.header_name || 'X-API-KEY',
            key: row.revealedKey || '',
            is_active: row.is_active,
            allowed_domains_uids: [...(row.allowed_domains_uids || [])],
            description: row.description,
        };
        this.modalError = '';
        this.showModal = true;
    }

    closeModal(): void {
        if (this.saving) return;
        this.showModal = false;
    }

    generateKey(): void {
        const rnd = Array.from({length: 32}, () =>
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                .charAt(Math.floor(Math.random() * 62))).join('');
        this.form.key = `sk_${rnd}`;
    }

    submit(): void {
        this.modalError = '';
        if (!this.form.name.trim()) {
            this.modalError = 'Veuillez saisir le nom de la clé.';
            return;
        }
        if (!this.isEdit && !this.form.key.trim()) {
            this.modalError = 'Veuillez saisir ou générer la clé.';
            return;
        }

        const payload: any = {
            action: this.isEdit ? 2 : 1,
            uidapikey: this.isEdit ? this.editUid : '',
            name: this.form.name.trim(),
            header_name: (this.form.header_name || 'X-API-KEY').trim(),
            is_active: !!this.form.is_active,
            allowed_domains_uids: this.form.allowed_domains_uids || [],
            description: this.form.description.trim(),
        };
        // La clé n'est envoyée que si renseignée (en modification, vide = inchangée)
        if (this.form.key.trim()) payload.key = this.form.key.trim();

        this.saving = true;
        this.httService.postData(`${environment.api_url}api/:io-api-keys`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.saving = false;
                if (res.body.status || res.body.success) {
                    this.toast.success(res.body.message || (this.isEdit ? 'Clé API modifiée.' : 'Clé API ajoutée.'), 'Succès');
                    this.showModal = false;
                    this.loadCles();
                } else {
                    this.modalError = res.body.message || 'Échec de l\'enregistrement.';
                }
            })
            .catch((err: any) => {
                this.saving = false;
                this.modalError = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    // ── Activer / désactiver (action 2 = modifier) ────────────────────
    toggleActive(row: CleApiRow): void {
        this.togglingUid = row.uid;
        const payload = {
            action: 2,
            uidapikey: row.uid,
            name: row.name,
            header_name: row.header_name,
            is_active: !row.is_active,
            allowed_domains_uids: row.allowed_domains_uids || [],
            description: row.description,
        };
        this.httService.postData(`${environment.api_url}api/:io-api-keys`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.togglingUid = null;
                if (res.body.status || res.body.success) {
                    row.is_active = !row.is_active;
                    this.toast.success(row.is_active ? 'Clé API activée.' : 'Clé API désactivée.', 'Succès');
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
    async remove(row: CleApiRow): Promise<void> {
        const result = await Swal.fire({
            html: `
              <div style="margin-top:8px;">
                <p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px;">
                  Supprimer cette clé API ?
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
            uidapikey: row.uid,
            name: row.name,
            header_name: row.header_name,
            is_active: row.is_active,
            allowed_domains_uids: row.allowed_domains_uids || [],
            description: row.description,
        };
        this.httService.postData(`${environment.api_url}api/:io-api-keys`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.toast.success('Clé API supprimée.', 'Succès');
                    this.loadCles();
                } else {
                    this.toast.error(res.body.message || 'Suppression échouée.', 'Erreur');
                }
            })
            .catch(() => {
                this.toast.error('Une erreur est survenue.', 'Erreur');
            });
    }
}
