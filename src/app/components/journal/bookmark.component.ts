import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import moment from 'moment';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {CardComponent} from '../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../protect/authorization.service';
import {HttpService} from '../../core/http.service';
import {environment} from '../../../environments/environment';

interface JournalRow {
    uid: string;
    entite: string;        // Entité
    numero_doc: string;    // Numéro doc.        — à compléter
    action_doc: string;    // Action (sur pièce) — à compléter
    direction: string;     // Direction          — à compléter
    service: string;       // Service
    type_doc: string;      // Type de doc.        — à compléter
    action_logs: string;   // Action (libellé du log)
    par_qui: string;       // Par qui ?
    date: string;          // Date d'action
    autorise: string;      // Autorisé            — à compléter
    ts: number;
    raw: any;
    societe: any;
}

@Component({
    selector: 'app-bookmark',
    imports: [CommonModule, FormsModule, NzTableModule, NzTagModule, NzSelectModule, NzDatePickerModule, NzToolTipModule, CardComponent, FeatherIconComponent],
    templateUrl: './bookmark.component.html',
    styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent implements OnInit {

    private users: any = [];
    isloading: boolean = false;
    searchValue: string = '';

    // Filtres serveur
    selectedSociete: string = '';
    selectedUser: string | null = null;   // iduser_auth
    selectedDateRange: Date[] = [];       // [date_start, date_end]

    dataSocietes: any[] = [];
    dataUsers: any[] = [];
    loadingUsers: boolean = false;

    private allRows: JournalRow[] = [];
    rows: JournalRow[] = [];

    constructor(private autor: Authorization, private httService: HttpService) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.selectedSociete = this.users?.datasociete?.uid || '';
        this.loadSocietes();
        this.loadUsers();
        this.loadJournal();
    }

    // ── Chargement ────────────────────────────────────────────────────
    loadJournal(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        const id = this.selectedSociete || this.users?.datasociete?.uid || '';
        const iduser = this.selectedUser || '';
        const dateStart = this.selectedDateRange?.[0] ? moment(this.selectedDateRange[0]).format('YYYY-MM-DD') : '';
        const dateEnd = this.selectedDateRange?.[1] ? moment(this.selectedDateRange[1]).format('YYYY-MM-DD') : '';
        const url = `${environment.api_url}api/:save-historisation-pieces-docs`
            + `?idhistopiecedocs=&idsociete=${id}&idservice=&iddocuments=&idpiece_docs=&iduser_auth=${iduser}&code_action=&date_start=${dateStart}&date_end=${dateEnd}`;

        this.httService.getData(url, false, this.users?.access_token || '').toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log('save-historisation-pieces-docs ===', res.body);
                if (res.body.status || res.body.success) {
                    this.allRows = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.filtersService = [...new Set(this.allRows.map(r => r.service).filter(Boolean))]
                        .map(v => ({text: v, value: v}));
                    this.applyFilter();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private mapRow(e: any): JournalRow {
        const dateVal = e?.date_en || e?.created_at || '';
        const p = e?.datauser?.datapersonnel || e?.datapersonnel || null;
        const nom = p ? `${p?.nom || ''} ${p?.prenom || ''}`.trim() : '';
        return {
            uid: e?.uid || e?.idhistopiecedocs || '',
            entite: e?.societe?.raison_sociale || e?.datasociete?.raison_sociale || '',
            numero_doc: e?.datadocuments?.code_docs || e?.code_docs || '',   // à compléter
            action_doc: '',                                                  // à compléter
            direction: '',                                                   // à compléter
            service: e?.dataservice?.libelle || e?.dataservices?.libelle || e?.service || '',
            type_doc: '',                                                    // à compléter
            action_logs: e?.action_logs || '',
            par_qui: e?.user_auth || nom || e?.datauser?.email || '',
            date: dateVal ? moment(dateVal).format('DD/MM/YYYY HH:mm') : '',
            autorise: '',                                                    // à compléter
            ts: dateVal ? moment(dateVal).valueOf() : 0,
            raw: e,
            societe: e?.societe,
        };
    }

    // ── Tri / filtre colonne (nz-table) ───────────────────────────────
    sortFns = {
        entite: (a: JournalRow, b: JournalRow) => (a.entite || '').localeCompare(b.entite || ''),
        numeroDoc: (a: JournalRow, b: JournalRow) => (a.numero_doc || '').localeCompare(b.numero_doc || ''),
        direction: (a: JournalRow, b: JournalRow) => (a.direction || '').localeCompare(b.direction || ''),
        service: (a: JournalRow, b: JournalRow) => (a.service || '').localeCompare(b.service || ''),
        typeDoc: (a: JournalRow, b: JournalRow) => (a.type_doc || '').localeCompare(b.type_doc || ''),
        parQui: (a: JournalRow, b: JournalRow) => (a.par_qui || '').localeCompare(b.par_qui || ''),
        date: (a: JournalRow, b: JournalRow) => a.ts - b.ts,
    };

    filtersService: { text: string; value: string }[] = [];
    filterService = (list: string[], item: JournalRow) => list.some(v => item.service === v);

    private loadSocietes(): void {
        this.httService.getData(
            `${environment.api_url}auth/:savesociete?code_societe=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.dataSocietes = (res.body.data || []).map((e: any) => ({
                        label: e?.raison_sociale || '',
                        value: e?.uid || e?.id,
                    })).filter((s: any) => s.value && s.label);
                }
            })
            .catch(() => {
            });
    }

    /* Comptes utilisateurs de la société sélectionnée (pour le filtre iduser_auth) */
    private loadUsers(): void {
        this.dataUsers = [];
        const id = this.selectedSociete || this.users?.datasociete?.uid || '';
        this.loadingUsers = true;
        this.httService.getData(
            `${environment.api_url}auth/:liste-des-comptes?idsociete=${id}&idpersonnel=`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingUsers = false;
                if (res.body.status || res.body.success) {
                    this.dataUsers = (res.body.data || []).map((e: any) => {
                        const p = e?.datapersonnel || {};
                        const nom = `${p?.nom || ''} ${p?.prenom || ''}`.trim();
                        return {
                            label: nom || e?.login || e?.email || '',
                            value: e?.uid || e?.id,
                        };
                    }).filter((u: any) => u.value && u.label);
                }
            })
            .catch(() => {
                this.loadingUsers = false;
            });
    }

    // ── Filtres ───────────────────────────────────────────────────────
    onSocieteChange(value: string): void {
        this.selectedSociete = value || '';
        // La société conditionne les comptes → on réinitialise l'utilisateur et on recharge la LISTE
        // des utilisateurs (pas le journal : c'est le bouton Rechercher qui lance la recherche).
        this.selectedUser = null;
        this.dataUsers = [];
        this.loadUsers();
    }

    onUserChange(value: string | null): void {
        this.selectedUser = value || null;
    }

    onDateRangeChange(value: Date[] | null): void {
        this.selectedDateRange = value && value.length === 2 ? value : [];
    }

    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    resetFilters(): void {
        this.selectedSociete = this.users?.datasociete?.uid || '';
        this.selectedUser = null;
        this.selectedDateRange = [];
        this.searchValue = '';
        this.loadUsers();
        this.loadJournal();
    }

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r =>
                r.action_logs.toLowerCase().includes(q) ||
                r.par_qui.toLowerCase().includes(q) ||
                r.entite.toLowerCase().includes(q) ||
                r.numero_doc.toLowerCase().includes(q) ||
                r.service.toLowerCase().includes(q))
            : [...this.allRows];
    }

    // ══ Filtres « pills » ═════════════════════════════════════════════
    openFilter: 'societe' | 'user' | null = null;
    societeSearch: string = '';
    userSearch: string = '';

    exportOpen: boolean = false;
    filtersVisible: boolean = false;   // bloc de recherche masqué par défaut

    @HostListener('document:click')
    onDocClick(): void {
        this.openFilter = null;
        this.exportOpen = false;
    }

    toggleExport(event: Event): void {
        event.stopPropagation();
        if (!this.rows.length) return;
        this.openFilter = null;
        this.exportOpen = !this.exportOpen;
    }

    toggleFilter(name: 'societe' | 'user', event: Event): void {
        event.stopPropagation();
        this.openFilter = this.openFilter === name ? null : name;
        this.societeSearch = '';
        this.userSearch = '';
    }

    get societeLabel(): string {
        return this.dataSocietes.find(s => s.value === this.selectedSociete)?.label || '';
    }

    get userLabel(): string {
        return this.dataUsers.find(u => u.value === this.selectedUser)?.label || '';
    }

    get hasFilters(): boolean {
        return !!(this.selectedUser || this.selectedDateRange?.length || this.searchValue
            || (this.selectedSociete && this.selectedSociete !== this.users?.datasociete?.uid));
    }

    filteredSocietes(): any[] {
        const q = this.societeSearch.trim().toLowerCase();
        return q ? this.dataSocietes.filter(s => s.label.toLowerCase().includes(q)) : this.dataSocietes;
    }

    filteredUsers(): any[] {
        const q = this.userSearch.trim().toLowerCase();
        return q ? this.dataUsers.filter(u => u.label.toLowerCase().includes(q)) : this.dataUsers;
    }

    pickSociete(value: string): void {
        if (value !== this.selectedSociete) this.onSocieteChange(value);
        this.openFilter = null;
    }

    pickUser(value: string): void {
        this.onUserChange(value);
        this.openFilter = null;
    }

    clearSociete(event: Event): void {
        event.stopPropagation();
        this.onSocieteChange(this.users?.datasociete?.uid || '');
    }

    clearUser(event: Event): void {
        event.stopPropagation();
        this.onUserChange(null);
    }

    clearDate(event: Event): void {
        event.stopPropagation();
        this.onDateRangeChange(null);
    }

    // ══ Exports ═══════════════════════════════════════════════════════
    private exportRows(): any[] {
        return this.rows.map(r => ({
            'Entité': r.entite || '',
            'Numéro doc.': r.numero_doc || '',
            'Action doc.': r.action_doc || '',
            'Direction': r.direction || '',
            'Service': r.service || '',
            'Type de doc.': r.type_doc || '',
            'Action': r.action_logs || '',
            'Par qui ?': r.par_qui || '',
            'Date d\'action': r.date || '',
            'Autorisé': r.autorise || '',
        }));
    }

    exportExcel(): void {
        if (!this.rows.length) return;
        const ws = XLSX.utils.json_to_sheet(this.exportRows());
        ws['!cols'] = [
            {wch: 26}, {wch: 18}, {wch: 22}, {wch: 22}, {wch: 24},
            {wch: 16}, {wch: 60}, {wch: 24}, {wch: 18}, {wch: 12},
        ];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Journal');
        XLSX.writeFile(wb, `journal_historique_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    }

    private loadImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    /** Dessine un entête professionnel (logo, panneau d'infos, bandeau titre) et renvoie la position Y suivante. */
    private drawPdfHeader(doc: jsPDF): number {
        const pageW = doc.internal.pageSize.getWidth();
        const left = 14;
        const right = pageW - 14;
        const contentW = right - left;
        const NAVY: [number, number, number] = [0, 54, 110];

        // ── Logo / branding ──
        const logo: HTMLImageElement | null = (this as any)._pdfLogo || null;
        let brandBottom = 12;
        if (logo && logo.naturalWidth) {
            const h = 18;
            const w = h * (logo.naturalWidth / logo.naturalHeight);
            doc.addImage(logo, 'PNG', left, 10, w, h);
            brandBottom = 10 + h;
        } else {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.setTextColor(...NAVY);
            doc.text('ARCHIVE PRO', left, 18);
            brandBottom = 22;
        }

        // Date d'édition (coin haut droit)
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 116, 139);
        doc.text(`Édité le ${moment().format('DD/MM/YYYY [à] HH:mm')}`, right, 14, {align: 'right'});

        // ── Panneau d'infos (arrondi, 2 colonnes) ──
        const start = this.selectedDateRange?.[0] ? moment(this.selectedDateRange[0]).format('DD/MM/YYYY') : '';
        const end = this.selectedDateRange?.[1] ? moment(this.selectedDateRange[1]).format('DD/MM/YYYY') : '';
        const periode = (start && end) ? `${start}  au  ${end}` : (start || end || 'Toutes les dates');

        const panelY = brandBottom + 5;
        const panelH = 26;
        doc.setFillColor(244, 247, 250);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.2);
        doc.roundedRect(left, panelY, contentW, panelH, 2.5, 2.5, 'FD');

        const drawKV = (label: string, value: string, x: number, y: number) => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(71, 85, 105);
            doc.text(label, x, y);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(15, 23, 42);
            doc.text(value || '—', x + 42, y);
        };

        const colX1 = left + 7;
        const colX2 = left + contentW / 2 + 4;
        let ky = panelY + 8;
        drawKV('Opération du', periode, colX1, ky);
        drawKV('Type de document', '', colX1, ky + 7);
        drawKV('Effectué par', this.userLabel || '', colX1, ky + 14);
        drawKV('Société', this.societeLabel || '', colX2, ky);
        drawKV("Nombre d'actions", String(this.rows.length), colX2, ky + 7);

        // ── Titre (sobre : texte navy centré) ──
        const titleY = panelY + panelH + 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(...NAVY);
        doc.text('JOURNAL DES OPÉRATIONS', pageW / 2, titleY, {align: 'center'});

        return titleY + 8;
    }

    async exportPdf(): Promise<void> {
        if (!this.rows.length) return;
        const doc = new jsPDF({orientation: 'landscape', unit: 'mm', format: 'a4'});

        // Chargement du logo (best-effort)
        try {
            (this as any)._pdfLogo = await this.loadImage('assets/images/logo/logo_apw_full.png');
        } catch {
            (this as any)._pdfLogo = null;
        }

        const startY = this.drawPdfHeader(doc);

        autoTable(doc, {
            startY,
            head: [['Entité', 'Numéro doc.', 'Action doc.', 'Direction', 'Service',
                'Type de doc.', 'Action', 'Par qui ?', 'Date', 'Autorisé']],
            body: this.rows.map(r => [
                r.entite || '', r.numero_doc || '', r.action_doc || '', r.direction || '', r.service || '',
                r.type_doc || '', r.action_logs || '', r.par_qui || '', r.date || '', r.autorise || '',
            ]),
            styles: {fontSize: 7, cellPadding: 1.5, valign: 'top', overflow: 'linebreak'},
            headStyles: {fillColor: [0, 54, 110], textColor: 255, fontStyle: 'bold', fontSize: 7},
            alternateRowStyles: {fillColor: [248, 250, 252]},
            columnStyles: {
                6: {cellWidth: 70},   // Action (libellé) — la plus large
            },
            // Réimprime le titre sur les pages suivantes
            margin: {top: 14},
        });

        doc.save(`journal_operations_${moment().format('YYYYMMDD_HHmmss')}.pdf`);
    }
}
