import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import * as XLSX from 'xlsx';
import moment from 'moment';
import 'moment/locale/fr';

import {CardComponent} from '../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../protect/authorization.service';
import {HttpService} from '../../../core/http.service';
import {
    DocumentRow,
    lignesDeReponse,
    mapperDocument,
    reponseOk,
    totalDeReponse,
    urlListeDocuments,
} from '../documents-imputation-api';

/**
 * ══ MES IMPUTATIONS ═════════════════════════════════════════════════════════
 *
 * Le pendant de « Documents à imputer » : les documents qui ont déjà été
 * adressés à quelqu'un. Même source, même pagination serveur, seul is_imputed
 * change — d'où le fichier commun documents-imputation-api.ts.
 */
@Component({
    selector: 'app-mes-imputations',
    imports: [
        CommonModule, FormsModule, NzTagModule, NzToolTipModule,
        CardComponent, FeatherIconComponent,
    ],
    templateUrl: './mes-imputations.component.html',
    styleUrl: './mes-imputations.component.scss',
})
export class MesImputationsComponent implements OnInit, AfterViewInit {

    private users: any = {};
    isloading = false;
    isExporting = false;
    erreur = '';

    searchValue = '';
    private rechercheTimer: any = null;

    // ── Données de la page courante ──────────────────────────
    rows: DocumentRow[] = [];

    // ── Pagination serveur ───────────────────────────────────
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
    total = 0;

    constructor(private autor: Authorization, private httService: HttpService) {
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.charger();
    }

    // ── Chargement ───────────────────────────────────────────

    private url(page: number, pageSize: number): string {
        return urlListeDocuments({
            page,
            pageSize,
            idsociete: this.users?.datasociete?.uid || '',
            isImputed: true,
            search: this.searchValue,
        });
    }

    charger(): void {
        this.isloading = true;
        this.erreur = '';

        this.httService.getData(this.url(this.pageIndex, this.pageSize), false,
            this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                const body = res?.body;
                if (reponseOk(body)) {
                    this.rows = lignesDeReponse(body).map(e => this.mapper(e));
                    this.total = totalDeReponse(body, this.rows.length);
                    setTimeout(() => this.syncHScroll());
                } else {
                    this.rows = [];
                    this.total = 0;
                    this.erreur = body?.message || 'Chargement des documents impossible.';
                }
            })
            .catch(() => {
                this.isloading = false;
                this.rows = [];
                this.total = 0;
                this.erreur = 'Chargement des documents impossible.';
            });
    }

    private mapper(e: any): DocumentRow {
        return mapperDocument(e, d => moment(d).format('DD/MM/YYYY'));
    }

    // ── Pagination (pied du tableau) ─────────────────────────
    // Les données arrivent page par page du serveur : le pied pilote
    // `pageIndex`/`pageSize` et relance `charger()`.

    get nbPages(): number {
        return Math.max(1, Math.ceil(this.total / this.pageSize));
    }

    allerPage(page: number): void {
        const cible = Math.min(Math.max(page, 1), this.nbPages);
        if (cible === this.pageIndex) return;
        this.pageIndex = cible;
        this.charger();
    }

    changerTaille(taille: number): void {
        if (taille === this.pageSize) return;
        this.pageSize = taille;
        this.pageIndex = 1;
        this.charger();
    }

    // ── Recherche ────────────────────────────────────────────

    /** Déléguée au serveur : filtrer localement ne porterait que sur la page. */
    onSearch(): void {
        clearTimeout(this.rechercheTimer);
        this.rechercheTimer = setTimeout(() => {
            this.pageIndex = 1;
            this.charger();
        }, 400);
    }

    effacerRecherche(): void {
        this.searchValue = '';
        this.onSearch();
    }

    // ── Export ───────────────────────────────────────────────

    /** Comme ailleurs : l'export porte sur la liste entière, pas sur la page. */
    exportToExcel(): void {
        if (this.isExporting) return;
        this.isExporting = true;

        this.httService.getData(this.url(1, Math.max(this.total, this.pageSize, 1)), false,
            this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isExporting = false;
                const body = res?.body;
                const donnees = reponseOk(body)
                    ? lignesDeReponse(body).map(e => this.mapper(e))
                    : this.rows;
                this.ecrireClasseur(donnees);
            })
            .catch(() => {
                this.isExporting = false;
                this.ecrireClasseur(this.rows);
            });
    }

    private ecrireClasseur(donnees: DocumentRow[]): void {
        const rows = donnees.map(row => ({
            'Numéro doc.': row.code_docs,
            'Objet': row.lib_docs,
            'Type doc.': row.libelle_type_docs,
            'Date': row.date_docs,
            'Service': row.libelle_service,
            'Auteur': row.auteur,
        }));

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Mes imputations');

        ws['!cols'] = Object.keys(rows[0] || {}).map(key => ({
            wch: Math.max(key.length, ...rows.map((r: any) => String(r[key] || '').length)) + 2,
        }));

        XLSX.writeFile(wb, `mes_imputations_${moment().format('YYYYMMDD_HHmmss')}.xlsx`);
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
