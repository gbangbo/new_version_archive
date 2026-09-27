import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {ToastrService} from 'ngx-toastr';
import moment from 'moment';
import * as XLSX from 'xlsx';
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
    imports: [CommonModule, FormsModule, NzTagModule, NzToolTipModule, NzDatePickerModule, CardComponent, FeatherIconComponent],
    templateUrl: './demandes-autorisation.component.html',
    styleUrl: './demandes-autorisation.component.scss',
})
export class DemandesAutorisationComponent implements OnInit, AfterViewInit {

    private users: any = [];
    isloading: boolean = false;
    searchValue: string = '';
    isExporting = false;

    // ── Pagination (les demandes sont chargées en une fois) ──
    pageIndex = 1;
    pageSize = 10;
    readonly taillesPage = [10, 20, 50, 100];

    private allRows: DemandeRow[] = [];
    /** Les demandes retenues par la recherche. */
    rows: DemandeRow[] = [];

    // ── Ascenseur horizontal dessiné (les barres natives sont masquées sur iOS) ──
    @ViewChild('tableWrap') tableWrap?: ElementRef<HTMLDivElement>;
    @ViewChild('hBar') hBar?: ElementRef<HTMLDivElement>;
    hScrollVisible = false;
    hScrollMore = false;
    thumbWidth = 0;
    thumbLeft = 0;
    private dragging = false;
    private dragStartX = 0;
    private dragStartScroll = 0;

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

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = this.allRows.filter(r => {
            const matchSearch = !q ||
                r.demandeur.toLowerCase().includes(q) ||
                r.beneficiaire.toLowerCase().includes(q) ||
                r.document.toLowerCase().includes(q) ||
                r.motif.toLowerCase().includes(q) ||
                (r.code_docs || '').toLowerCase().includes(q);
            return matchSearch;
        });
        this.pageIndex = 1;               // un nouveau filtre repart de la première page
        setTimeout(() => this.syncHScroll());
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

    // ── Pagination ───────────────────────────────────────────
    // Les demandes arrivent toutes en une fois : la pagination est donc locale,
    // elle ne fait que découper `rows`.

    get nbPages(): number {
        return Math.max(1, Math.ceil(this.rows.length / this.pageSize));
    }

    get rowsPage(): DemandeRow[] {
        const debut = (this.pageIndex - 1) * this.pageSize;
        return this.rows.slice(debut, debut + this.pageSize);
    }

    allerPage(page: number): void {
        const cible = Math.min(Math.max(page, 1), this.nbPages);
        if (cible === this.pageIndex) return;
        this.pageIndex = cible;
        setTimeout(() => this.syncHScroll());
    }

    changerTaille(taille: number): void {
        if (taille === this.pageSize) return;
        this.pageSize = taille;
        this.pageIndex = 1;
        setTimeout(() => this.syncHScroll());
    }

    // ── Export Excel ─────────────────────────────────────────

    /**
     * L'export porte sur la sélection courante (recherche comprise) et non sur
     * la seule page affichée : un fichier qui ne contiendrait que 10 lignes
     * surprendrait plus qu'il n'aiderait.
     */
    exportToExcel(): void {
        if (this.isExporting || !this.rows.length) return;
        this.isExporting = true;

        const lignes = this.rows.map(r => ({
            'Bénéficiaire': r.beneficiaire,
            'Demandeur': r.demandeur,
            'Document': r.document,
            'Code doc.': r.code_docs || '',
            'Action(s)': (r.actions || []).join(', '),
            'Statut': this.statutLabel(r.statut),
            'Période': r.periode,
            'Date demande': r.date || '',
            'Motif': r.motif || '',
        }));

        const ws = XLSX.utils.json_to_sheet(lignes);
        ws['!cols'] = Object.keys(lignes[0] || {}).map(key => ({
            wch: Math.max(key.length, ...lignes.map((l: any) => String(l[key] || '').length)) + 2,
        }));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Demandes d'autorisation");
        XLSX.writeFile(wb, `demandes_autorisation_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);

        this.isExporting = false;
    }

    // ══ Ascenseur horizontal personnalisé ═══════════════════════════════
    ngAfterViewInit(): void {
        setTimeout(() => this.syncHScroll());
    }

    @HostListener('window:resize')
    syncHScroll(): void {
        const el = this.tableWrap?.nativeElement;
        if (!el) {
            return;
        }
        const maxScroll = el.scrollWidth - el.clientWidth;
        this.hScrollVisible = maxScroll > 2;
        this.hScrollMore = el.scrollLeft < maxScroll - 2;

        const barEl = this.hBar?.nativeElement;
        if (this.hScrollVisible && !barEl) {
            // la barre vient d'apparaître : on recalcule une fois qu'elle est rendue
            setTimeout(() => this.syncHScroll());
        }

        const track = barEl?.clientWidth || el.clientWidth;
        this.thumbWidth = Math.max(40, Math.round(track * (el.clientWidth / el.scrollWidth)));
        const maxX = track - this.thumbWidth;
        this.thumbLeft = maxScroll > 0 ? Math.round((el.scrollLeft / maxScroll) * maxX) : 0;
    }

    onBarPointerDown(ev: PointerEvent): void {
        const el = this.tableWrap?.nativeElement;
        const bar = this.hBar?.nativeElement;
        if (!el || !bar) {
            return;
        }
        const rect = bar.getBoundingClientRect();
        const maxScroll = el.scrollWidth - el.clientWidth;
        const maxX = rect.width - this.thumbWidth;
        const pointerX = ev.clientX - rect.left;

        // clic hors du pouce : on saute directement à cette position
        if (pointerX < this.thumbLeft || pointerX > this.thumbLeft + this.thumbWidth) {
            const x = Math.min(Math.max(pointerX - this.thumbWidth / 2, 0), maxX);
            el.scrollLeft = maxX > 0 ? (x / maxX) * maxScroll : 0;
        }

        this.dragging = true;
        this.dragStartX = ev.clientX;
        this.dragStartScroll = el.scrollLeft;
        bar.setPointerCapture(ev.pointerId);
        ev.preventDefault();
        this.syncHScroll();
    }

    @HostListener('document:pointermove', ['$event'])
    onBarPointerMove(ev: PointerEvent): void {
        if (!this.dragging) {
            return;
        }
        const el = this.tableWrap?.nativeElement;
        const bar = this.hBar?.nativeElement;
        if (!el || !bar) {
            return;
        }
        const maxScroll = el.scrollWidth - el.clientWidth;
        const maxX = bar.clientWidth - this.thumbWidth;
        const dx = ev.clientX - this.dragStartX;
        el.scrollLeft = this.dragStartScroll + (maxX > 0 ? dx * (maxScroll / maxX) : 0);
    }

    @HostListener('document:pointerup')
    @HostListener('document:pointercancel')
    onBarPointerUp(): void {
        this.dragging = false;
    }
}
