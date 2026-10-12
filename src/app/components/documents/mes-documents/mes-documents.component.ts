import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import moment from "moment";
import {Router} from "@angular/router";
import {DocActionMenuComponent} from "../../../shared/components/ui/doc-action-menu/doc-action-menu.component";

interface RowData {
    libelle_type_docs: string;
    code_docs: string;
    lib_docs: string;
    date_docs: string;
    code_boites: string;
    color: string;
}

@Component({
    selector: 'app-mes-documents',
    imports: [
        CommonModule,
        FormsModule,
        CardComponent,
        NzTooltipDirective,
        FeatherIconComponent,
        DocActionMenuComponent],
    providers: [],
    templateUrl: './mes-documents.component.html',
    styleUrl: './mes-documents.component.scss',
})
export class MesDocumentsComponent implements OnInit, AfterViewInit {
    dataSociete: any = [];

    private users: any = [];
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataOneLigne: any = {};

    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: RowData[] = [];

    // ── Pagination (gabarit societe : pager maison dans le pied du tableau) ──
    pageIndex = 1;
    pageSize = 10;
    readonly taillesPage = [10, 20, 50, 100];

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

    private dataBenef: any = [];

    constructor(private autor: Authorization,
                private httService: HttpService, private router: Router) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showDocument(this.users?.datasociete?.uid, this.users.uid);
    }

    // ── Recherche globale ─────────────────────────────────────
    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataBenef.filter((row: any) =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val))
            )
            : [...this.dataBenef];
        this.pageIndex = 1;               // une nouvelle recherche repart de la première page
        setTimeout(() => this.syncHScroll());
    }

    // ── Rechargement après suppression d'un document ──────────
    onDocDeleted(): void {
        this.showDocument(this.users?.datasociete?.uid, this.users?.uid);
    }

    showDocument(idsociete: string = '', iduser_save: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.filteredData = [];
        this.httService.getData(`${environment.api_url}api/:savedocuments?idsociete=${idsociete}&iduser_save=${iduser_save}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status) {
                    this.dataBenef = res.body.data.map((e: any) => {

                        return {
                            ...e,
                            libelle_type_docs: `${e?.datatype_document ? e?.datatype_document[0]?.libelle_type_docs : ''}`,
                            code_boites: `${e?.databoites?.code_boites}`,
                            libelle_service: e?.dataservice?.libelle || '',
                            date_docs: moment(e?.date_docs).format('DD/MM/YYYY')
                        }
                    });
                    this.filteredData = [...this.dataBenef];
                    this.pageIndex = 1;
                }
                setTimeout(() => this.syncHScroll());
            })
            .catch((err) => {
                this.isloading = false;
            });

    }


    openModal(row?: any) {
        this.router.navigate(['/documents/creer-un-document']);
    }

    // ── Pagination ────────────────────────────────────────────
    get nbPages(): number {
        return Math.max(1, Math.ceil(this.filteredData.length / this.pageSize));
    }

    get rowsPage(): RowData[] {
        const debut = (this.pageIndex - 1) * this.pageSize;
        return this.filteredData.slice(debut, debut + this.pageSize);
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


    exportToExcel(filteredData: any) {
        // Les colonnes exportées suivent celles du tableau.
        const rows = filteredData.map((row: any) => ({
            'Numéro doc.': row.code_docs || '',
            'Objet': row.lib_docs || '',
            'Type doc.': row.libelle_type_docs || '',
            'Date': row.date_docs || '',
            'Position': row.code_boites || '',
            'Service': row.libelle_service || '',
        }));

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Liste des documents');

        const colWidths = Object.keys(rows[0] || {}).map(key => ({
            wch: Math.max(key.length, ...rows.map((r: any) => String(r[key] || '').length)) + 2
        }));
        ws['!cols'] = colWidths;

        const fileName = `documents_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
        XLSX.writeFile(wb, fileName);
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
        const maxScroll = el.scrollWidth - el.clientWidth;
        const rect = bar.getBoundingClientRect();
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
