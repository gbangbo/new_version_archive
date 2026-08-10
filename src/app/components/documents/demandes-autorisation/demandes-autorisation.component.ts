import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {ToastrService} from 'ngx-toastr';
import moment from 'moment';
import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {environment} from '../../../../environments/environment';

interface DemandeRow {
    idauth: string;
    code_auth: string;
    demandeur: string;
    demandeurMail: string;
    beneficiaire: string;
    document: string;
    code_docs: string;
    actions: string[];
    statut: string;
    motif: string;
    periode: string;
    date: string;
    active: boolean;
    raw: any;
}

@Component({
    selector: 'app-demandes-autorisation',
    imports: [CommonModule, FormsModule, NzTableModule, NzTagModule, NzSelectModule, NzToolTipModule, NzDatePickerModule, CardComponent, FeatherIconComponent],
    templateUrl: './demandes-autorisation.component.html',
    styleUrl: './demandes-autorisation.component.scss',
})
export class DemandesAutorisationComponent implements OnInit {

    private users: any = [];
    isloading: boolean = false;
    searchValue: string = '';
    selectedStatut: string = '';

    private allRows: DemandeRow[] = [];
    rows: DemandeRow[] = [];
    statuts: string[] = [];

    // ── Décision (validation / rejet) ─────────────────────────────────
    showDecision: boolean = false;
    decisionAction: 1 | 2 = 1;          // 1 = validation, 2 = rejet
    decisionRow: DemandeRow | null = null;
    decisionSaving: boolean = false;
    decisionError: string = '';
    decisionData: { range: Date[]; comment: string; reason: string } = {
        range: [],
        comment: '',
        reason: '',
    };

    disabledPastDate = (current: Date): boolean => {
        if (!current) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return current < today;
    };

    // ── Détails ───────────────────────────────────────────────────────
    showDetail: boolean = false;
    detailRow: DemandeRow | null = null;

    constructor(private autor: Authorization, private httService: HttpService, private toast: ToastrService) {
    }

    openDetail(row: DemandeRow): void {
        this.detailRow = row;
        this.showDetail = true;
    }

    closeDetail(): void {
        this.showDetail = false;
        this.detailRow = null;
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        console.log(this.users?.dataservice?.uid)
        this.loadDemandes();
    }

    // ── Chargement ────────────────────────────────────────────────────
    loadDemandes(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        const id = this.users?.datasociete?.uid || '';
        const idservice = this.users?.dataservice?.uid || '';
        this.httService.getData(
            `${environment.api_url}api/:save-demande-authorisation?idsociete=${id}&idservice=${idservice}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log('save-demande-authorisation ===', res.body);
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.statuts = [...new Set(this.allRows.map(r => r.statut).filter(Boolean))];
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private mapRow(e: any): DemandeRow {
        const doc = e?.datadocuments || e?.documents || e?.datadocument || {};
        const actions = (e?.action_auth || '')
            .split(',').map((s: string) => s.trim()).filter((s: string) => s);
        return {
            idauth: e?.uid || e?.idauth || '',
            code_auth: e?.code_auth || '',
            demandeur: this.personName(e?.datauser_auth) || e?.iduser_auth || '—',
            demandeurMail: this.personMail(e?.datauser_auth),
            beneficiaire: this.personName(e?.datauser_save) || e?.iduser_save || '—',
            document: doc?.lib_docs || doc?.lib_document || e?.iddocuments || '—',
            code_docs: doc?.code_docs || '',
            actions,
            statut: e?.statut_demande || '',
            motif: e?.motif_auth || '',
            periode: this.formatRange(e?.deadline_start_auth, e?.deadline_end_auth),
            date: e?.created_at ? moment(e.created_at).format('DD/MM/YYYY HH:mm') : '',
            active: !!e?.active_auth,
            raw: e,
        };
    }

    private personName(u: any): string {
        if (!u) return '';
        const p = u?.datapersonnel || u;
        const nom = `${p?.nom || ''} ${p?.prenom || ''}`.trim();
        return nom || u?.name || u?.login || '';
    }

    private personMail(u: any): string {
        return u?.email || u?.datapersonnel?.email || '';
    }

    private formatRange(start: any, end: any): string {
        const s = start ? moment(start).format('DD/MM/YYYY') : '';
        const e = end ? moment(end).format('DD/MM/YYYY') : '';
        if (s && e) return `${s} → ${e}`;
        return s || e || '—';
    }

    // ── Filtres ───────────────────────────────────────────────────────
    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    onStatutChange(value: string): void {
        this.selectedStatut = value || '';
        this.applyFilter();
    }

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = this.allRows.filter(r => {
            const matchStatut = !this.selectedStatut || r.statut === this.selectedStatut;
            const matchSearch = !q ||
                r.demandeur.toLowerCase().includes(q) ||
                r.beneficiaire.toLowerCase().includes(q) ||
                r.document.toLowerCase().includes(q) ||
                r.motif.toLowerCase().includes(q) ||
                (r.code_docs || '').toLowerCase().includes(q);
            return matchStatut && matchSearch;
        });
    }

    // ── Helpers d'affichage ───────────────────────────────────────────
    /* Normalise le statut (FR/EN) vers une clé stable */
    private normalizeStatut(s: string): 'pending' | 'approved' | 'rejected' | 'other' {
        const v = (s || '').toLowerCase();
        if (v.includes('attente') || v.includes('cours') || v.includes('pending')) return 'pending';
        if (v.includes('approuv') || v.includes('approved') || v.includes('valid') || v.includes('accept')) return 'approved';
        if (v.includes('rejet') || v.includes('rejected') || v.includes('refus') || v.includes('reject')) return 'rejected';
        return 'other';
    }

    statutColor(s: string): string {
        switch (this.normalizeStatut(s)) {
            case 'pending': return 'gold';
            case 'approved': return 'green';
            case 'rejected': return 'red';
            default: return 'blue';
        }
    }

    statutLabel(s: string): string {
        switch (this.normalizeStatut(s)) {
            case 'pending': return 'En attente';
            case 'approved': return 'Approuvée';
            case 'rejected': return 'Rejetée';
            default: return s ? s.charAt(0).toUpperCase() + s.slice(1) : '—';
        }
    }

    actionColor(a: string): string {
        const v = (a || '').toLowerCase();
        if (v.includes('consult')) return 'blue';
        if (v.includes('telecharg') || v.includes('download')) return 'geekblue';
        if (v.includes('impress') || v.includes('print')) return 'purple';
        return 'default';
    }

    initials(name: string): string {
        const parts = (name || '').trim().split(/\s+/).filter(Boolean);
        if (!parts.length) return '?';
        return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
    }

    // ── Décision : validation / rejet ─────────────────────────────────
    isPending(r: DemandeRow): boolean {
        const v = (r?.statut || '').toLowerCase();
        if (!v) return true;
        return v.includes('attente') || v.includes('cours') || v.includes('pending');
    }

    openDecision(row: DemandeRow, action: 1 | 2): void {
        this.decisionRow = row;
        this.decisionAction = action;
        this.decisionError = '';
        // Pré-remplit la période avec celle demandée si disponible
        const start = row?.raw?.deadline_start_auth ? new Date(row.raw.deadline_start_auth) : null;
        const end = row?.raw?.deadline_end_auth ? new Date(row.raw.deadline_end_auth) : null;
        this.decisionData = {
            range: (start && end) ? [start, end] : [],
            comment: '',
            reason: '',
        };
        this.showDecision = true;
    }

    closeDecision(): void {
        this.showDecision = false;
        this.decisionRow = null;
    }

    submitDecision(): void {
        this.decisionError = '';
        const row = this.decisionRow;
        if (!row) return;

        if (this.decisionAction === 2 && !this.decisionData.reason.trim()) {
            this.decisionError = 'Veuillez saisir le motif du rejet.';
            return;
        }

        const payload: any = {
            action: this.decisionAction,
            idauth: row.idauth,
            idsociete: this.users?.datasociete?.uid || '',
            iduser_save: row.raw?.iduser_save || '',
            active_auth: this.decisionAction === 1,
            decision_comment: this.decisionData.comment?.trim() || '',
        };

        if (this.decisionAction === 1) {
            const range = this.decisionData.range || [];
            const s = this.fmtDate(range[0]);
            const e = this.fmtDate(range[1]);
            if (s) payload.deadline_start_auth = s;
            if (e) payload.deadline_end_auth = e;
        } else {
            const reason = this.decisionData.reason.trim();
            payload.rejected_reason = reason;
            payload.decision_comment = reason; // motif du rejet = commentaire de décision
        }

        this.decisionSaving = true;
        this.httService
            .postData(`${environment.api_url}api/:save-authorisation-a-valide`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.decisionSaving = false;
                if (res.body.status || res.body.success) {
                    this.toast.success(
                        res.body.message || (this.decisionAction === 1 ? 'Autorisation validée.' : 'Demande rejetée.'),
                        'Succès'
                    );
                    this.showDecision = false;
                    this.decisionRow = null;
                    this.loadDemandes();
                } else {
                    this.decisionError = res.body.message || 'Échec de l\'opération.';
                }
            })
            .catch((err: any) => {
                this.decisionSaving = false;
                this.decisionError = err?.error?.err?.message || err?.error?.message || 'Une erreur est survenue.';
            });
    }

    private fmtDate(d: Date | null | undefined): string {
        return d ? moment(d).format('YYYY-MM-DD') : '';
    }
}
