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
    user: string;
    action_logs: string;
    service: string;
    code_action: string;
    date: string;
    ts: number;
    raw: any;
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
    selectedNiveau: number | null = 2;   // 2 = Service par défaut
    selectedService: string | null = null;
    selectedDate: Date | null = null;

    dataSocietes: any[] = [];
    dataNiveaux = [
        {value: 0, label: 'Direction'},
        {value: 1, label: 'Sous-direction'},
        {value: 2, label: 'Service'},
    ];
    dataServices: any[] = [];
    loadingServices: boolean = false;

    private allRows: JournalRow[] = [];
    rows: JournalRow[] = [];

    constructor(private autor: Authorization, private httService: HttpService) {
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.selectedSociete = this.users?.datasociete?.uid || '';
        this.loadSocietes();
        this.loadServices();
        this.loadJournal();
    }

    // ── Chargement ────────────────────────────────────────────────────
    loadJournal(): void {
        this.isloading = true;
        this.allRows = [];
        this.rows = [];
        const id = this.selectedSociete || this.users?.datasociete?.uid || '';
        const idservice = this.selectedService || '';
        const dateEn = this.selectedDate ? moment(this.selectedDate).format('YYYY-MM-DD') : '';
        const url = `${environment.api_url}api/:save-historisation-pieces-docs`
            + `?idhistopiecedocs=&idsociete=${id}&idservice=${idservice}&iddocuments=&idpiece_docs=&iduser_auth=&code_action=&date_en=${dateEn}`;

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
            user: e?.user_auth || nom || e?.datauser?.email || '—',
            action_logs: e?.action_logs || '',
            service: e?.dataservice?.libelle || e?.dataservices?.libelle || e?.service || '',
            code_action: e?.code_action || '',
            date: dateVal ? moment(dateVal).format('DD/MM/YYYY HH:mm') : '',
            ts: dateVal ? moment(dateVal).valueOf() : 0,
            raw: e,
        };
    }

    // ── Tri / filtre colonne (nz-table) ───────────────────────────────
    sortFns = {
        user: (a: JournalRow, b: JournalRow) => (a.user || '').localeCompare(b.user || ''),
        service: (a: JournalRow, b: JournalRow) => (a.service || '').localeCompare(b.service || ''),
        code: (a: JournalRow, b: JournalRow) => (a.code_action || '').localeCompare(b.code_action || ''),
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

    /* Entités de l'organigramme au niveau choisi, pour la société sélectionnée */
    private loadServices(): void {
        this.dataServices = [];
        if (this.selectedNiveau === null || this.selectedNiveau === undefined) return;
        const id = this.selectedSociete || this.users?.datasociete?.uid || '';
        this.loadingServices = true;
        this.httService.getData(
            `${environment.api_url}auth/:organigramme-responsable-service?idsociete=${id}&idservices=&niveau=${this.selectedNiveau}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.loadingServices = false;
                if (res.body.status || res.body.success) {
                    // L'API renvoie l'arbre : on aplatit puis on garde les entités du niveau choisi
                    const flat: any[] = [];
                    const walk = (nodes: any[]) => {
                        for (const n of nodes || []) {
                            flat.push(n);
                            if (n?.children?.length) walk(n.children);
                        }
                    };
                    walk(res.body.data || []);

                    const atLevel = flat.filter((e: any) => Number(e?.level) === Number(this.selectedNiveau));
                    const source = atLevel.length ? atLevel : flat; // fallback si pas de champ level

                    this.dataServices = source.map((e: any) => ({
                        label: e?.sigle ? `${e.sigle} — ${e.libelle}` : (e?.libelle || ''),
                        value: e?.uid,
                    })).filter((s: any) => s.value && s.label);
                }
            })
            .catch(() => {
                this.loadingServices = false;
            });
    }

    // ── Filtres ───────────────────────────────────────────────────────
    onSocieteChange(value: string): void {
        this.selectedSociete = value || '';
        // La société conditionne les entités de l'organigramme → on réinitialise le service
        this.selectedService = null;
        this.dataServices = [];
        this.loadServices();
        this.loadJournal();
    }

    onNiveauChange(value: number | null): void {
        this.selectedNiveau = (value === null || value === undefined) ? null : value;
        // Le niveau conditionne les entités à sélectionner → on réinitialise le service
        this.selectedService = null;
        this.dataServices = [];
        this.loadServices();
    }

    onServiceChange(value: string | null): void {
        this.selectedService = value || null;
        this.loadJournal();
    }

    onDateChange(value: Date | null): void {
        this.selectedDate = value || null;
        this.loadJournal();
    }

    onSearch(value: string): void {
        this.searchValue = value;
        this.applyFilter();
    }

    resetFilters(): void {
        this.selectedSociete = this.users?.datasociete?.uid || '';
        this.selectedNiveau = 2;
        this.selectedService = null;
        this.selectedDate = null;
        this.searchValue = '';
        this.loadServices();
        this.loadJournal();
    }

    private applyFilter(): void {
        const q = this.searchValue.trim().toLowerCase();
        this.rows = q
            ? this.allRows.filter(r =>
                r.action_logs.toLowerCase().includes(q) ||
                r.user.toLowerCase().includes(q) ||
                r.code_action.toLowerCase().includes(q) ||
                r.service.toLowerCase().includes(q))
            : [...this.allRows];
    }

    // ══ Filtres « pills » ═════════════════════════════════════════════
    openFilter: 'societe' | 'niveau' | 'service' | null = null;
    societeSearch: string = '';
    serviceSearch: string = '';

    @HostListener('document:click')
    onDocClick(): void {
        this.openFilter = null;
    }

    toggleFilter(name: 'societe' | 'niveau' | 'service', event: Event): void {
        event.stopPropagation();
        if (name === 'service' && (this.selectedNiveau === null || this.selectedNiveau === undefined)) return;
        this.openFilter = this.openFilter === name ? null : name;
        this.societeSearch = '';
        this.serviceSearch = '';
    }

    get societeLabel(): string {
        return this.dataSocietes.find(s => s.value === this.selectedSociete)?.label || '';
    }

    get niveauLabel(): string {
        return this.dataNiveaux.find(n => n.value === this.selectedNiveau)?.label || '';
    }

    get serviceLabel(): string {
        return this.dataServices.find(s => s.value === this.selectedService)?.label || '';
    }

    get hasFilters(): boolean {
        return !!(this.selectedService || this.selectedDate || this.searchValue
            || (this.selectedSociete && this.selectedSociete !== this.users?.datasociete?.uid));
    }

    filteredSocietes(): any[] {
        const q = this.societeSearch.trim().toLowerCase();
        return q ? this.dataSocietes.filter(s => s.label.toLowerCase().includes(q)) : this.dataSocietes;
    }

    filteredServices(): any[] {
        const q = this.serviceSearch.trim().toLowerCase();
        return q ? this.dataServices.filter(s => s.label.toLowerCase().includes(q)) : this.dataServices;
    }

    pickSociete(value: string): void {
        if (value !== this.selectedSociete) this.onSocieteChange(value);
        this.openFilter = null;
    }

    pickNiveau(value: number): void {
        if (value !== this.selectedNiveau) this.onNiveauChange(value);
        this.openFilter = null;
    }

    pickService(value: string): void {
        this.onServiceChange(value);
        this.openFilter = null;
    }

    clearSociete(event: Event): void {
        event.stopPropagation();
        this.onSocieteChange(this.users?.datasociete?.uid || '');
    }

    clearNiveau(event: Event): void {
        event.stopPropagation();
        this.onNiveauChange(null);
    }

    clearService(event: Event): void {
        event.stopPropagation();
        this.onServiceChange(null);
    }

    clearDate(event: Event): void {
        event.stopPropagation();
        this.onDateChange(null);
    }

    // ══ Exports ═══════════════════════════════════════════════════════
    private exportRows(): any[] {
        return this.rows.map(r => ({
            'Utilisateur': r.user || '',
            'Action': r.action_logs || '',
            'Service': r.service || '',
            'Code action': r.code_action || '',
            'Date': r.date || '',
        }));
    }

    exportExcel(): void {
        if (!this.rows.length) return;
        const ws = XLSX.utils.json_to_sheet(this.exportRows());
        ws['!cols'] = [{wch: 24}, {wch: 70}, {wch: 26}, {wch: 12}, {wch: 18}];
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Journal');
        XLSX.writeFile(wb, `journal_historique_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
    }

    exportPdf(): void {
        if (!this.rows.length) return;
        const doc = new jsPDF({orientation: 'landscape', unit: 'mm', format: 'a4'});
        doc.setFontSize(14);
        doc.setTextColor(0, 54, 110);
        doc.text('Journal des historiques', 14, 14);
        doc.setFontSize(9);
        doc.setTextColor(120);
        doc.text(`Généré le ${moment().format('DD/MM/YYYY HH:mm')} — ${this.rows.length} entrée(s)`, 14, 20);

        autoTable(doc, {
            startY: 25,
            head: [['Utilisateur', 'Action', 'Service', 'Code', 'Date']],
            body: this.rows.map(r => [r.user || '', r.action_logs || '', r.service || '', r.code_action || '', r.date || '']),
            styles: {fontSize: 8, cellPadding: 2, valign: 'top', overflow: 'linebreak'},
            headStyles: {fillColor: [0, 54, 110], textColor: 255, fontStyle: 'bold'},
            alternateRowStyles: {fillColor: [248, 250, 252]},
            columnStyles: {
                0: {cellWidth: 45},
                1: {cellWidth: 140},
                2: {cellWidth: 45},
                3: {cellWidth: 22},
                4: {cellWidth: 30},
            },
        });

        doc.save(`journal_historique_${moment().format('YYYYMMDD_HHmmss')}.pdf`);
    }
}
