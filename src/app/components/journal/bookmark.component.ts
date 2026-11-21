import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
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
    datapersonnel: any;
}

@Component({
    selector: 'app-bookmark',
    imports: [CommonModule, FormsModule, NzTagModule, NzSelectModule, NzDatePickerModule, NzToolTipModule, CardComponent, FeatherIconComponent],
    templateUrl: './bookmark.component.html',
    styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent implements OnInit, AfterViewInit {

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

    // ── Pagination serveur ────────────────────────────────────────────
    // La trame renvoie total / page / page_size / total_pages : le tableau
    // n'affiche qu'une page à la fois, le pied pilote la requête suivante.
    pageIndex: number = 1;
    pageSize: number = 10;
    total: number = 0;
    totalPages: number = 1;
    readonly taillesPage: number[] = [10, 20, 50, 100];
    isExporting: boolean = false;

    // Si l'API ignore `page` / `page_size`, on charge la liste entière une fois
    // et on la découpe ici : le pied de pagination reste utilisable.
    private paginationServeur: boolean = true;
    private lignesCompletes: JournalRow[] | null = null;
    /** 1re ligne de la page précédemment affichée : sert à repérer une page qui ne change pas. */
    private dernierPremierUid: string = '';

    // ── Tri (clic sur l'entête), appliqué à la page affichée ──────────
    sortKey: string = '';
    sortOrder: 'asc' | 'desc' | '' = '';

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
    /** Construit l'URL de la page demandée (mêmes filtres, pagination explicite). */
    private buildUrl(page: number, pageSize: number): string {
        const params = new URLSearchParams({
            idhistopiecedocs: '',
            idsociete: this.selectedSociete || this.users?.datasociete?.uid || '',
            idservice: '',
            iddocuments: '',
            idpiece_docs: '',
            iduser_auth: this.selectedUser || '',
            code_action: '',
            date_start: this.selectedDateRange?.[0] ? moment(this.selectedDateRange[0]).format('YYYY-MM-DD') : '',
            date_end: this.selectedDateRange?.[1] ? moment(this.selectedDateRange[1]).format('YYYY-MM-DD') : '',
            page: String(page),
            page_size: String(pageSize),
        });
        return `${environment.api_url}api/:save-historisation-pieces-docs?${params.toString()}`;
    }

    /**
     * @param resetPage true quand les critères changent : on repart de la page 1,
     *                  false quand c'est le pied de pagination qui demande une page.
     */
    loadJournal(resetPage: boolean = true): void {
        if (resetPage) {
            // Nouveaux critères : on oublie ce qu'on savait de la pagination.
            this.pageIndex = 1;
            this.lignesCompletes = null;
            this.paginationServeur = true;
            this.dernierPremierUid = '';
        }

        // Mode local : la liste entière est déjà en mémoire, on découpe.
        if (!this.paginationServeur && this.lignesCompletes) {
            this.afficherPageLocale();
            return;
        }

        this.isloading = true;
        this.allRows = [];
        this.rows = [];

        const demandee = this.pageIndex;
        const taille = this.pageSize;

        this.httService.getData(this.buildUrl(demandee, taille), false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                const body = res?.body || {};
                if (!(body.status || body.success)) {
                    this.isloading = false;
                    this.total = 0;
                    this.totalPages = 1;
                    return;
                }
                console.log('body.data',  body.data)
                const lignes: JournalRow[] = (body.data || []).map((e: any) => this.mapRow(e));
                const pageRenvoyee = Number(body.page) || demandee;
                this.total = Number(body.total ?? lignes.length) || 0;
                this.totalPages = Number(body.total_pages)
                    || Math.max(1, Math.ceil(this.total / taille));

                // Le serveur a-t-il réellement servi la page demandée ? On ne se
                // fie pas au seul champ `page` : on regarde surtout si les lignes
                // ont changé — une page qui renvoie la même première ligne que la
                // précédente n'a pas été paginée.
                const premierUid = lignes[0]?.uid || '';
                const memeContenu = !!premierUid && premierUid === this.dernierPremierUid;
                const ignoreLaPagination = lignes.length > taille
                    || (demandee > 1 && (pageRenvoyee !== demandee || memeContenu));

                if (!ignoreLaPagination) {
                    this.isloading = false;
                    this.dernierPremierUid = premierUid;
                    this.allRows = lignes;
                    this.applyFilter();
                    return;
                }

                // Non : on prend la main. La liste entière est chargée une fois,
                // puis découpée ici — le pied redevient utilisable quoi qu'il
                // arrive côté API.
                console.warn('[journal] la pagination serveur est ignorée (page demandée',
                    demandee, ', page renvoyée', pageRenvoyee, ', mêmes lignes :', memeContenu,
                    ') : découpage local activé.');
                this.paginationServeur = false;

                if (lignes.length >= this.total) {
                    this.isloading = false;
                    this.lignesCompletes = lignes;
                    this.afficherPageLocale();
                    return;
                }

                this.chargerToutesLesLignes()
                    .then(tout => {
                        this.isloading = false;
                        // On ne bascule en local que si la liste est bien complète :
                        // sinon le total affiché serait tronqué.
                        if (tout.length >= this.total && tout.length > lignes.length) {
                            this.lignesCompletes = tout;
                            this.afficherPageLocale();
                            return;
                        }
                        // L'API ne sait pas davantage renvoyer la liste entière :
                        // on affiche ce qu'elle a donné plutôt que de tronquer le total.
                        console.warn('[journal] la liste complète n\'a pas pu être récupérée :',
                            'la pagination restera figée tant que l\'API ignorera `page`.');
                        this.paginationServeur = true;
                        this.lignesCompletes = null;
                        this.allRows = lignes;
                        this.applyFilter();
                    })
                    .catch(() => {
                        this.isloading = false;
                        this.paginationServeur = true;
                        this.lignesCompletes = null;
                        this.allRows = lignes;
                        this.applyFilter();
                    });
            })
            .catch(() => {
                this.isloading = false;
                this.total = 0;
                this.totalPages = 1;
            });
    }

    /** Découpe la page courante dans la liste complète (mode local). */
    private afficherPageLocale(): void {
        const tout = this.lignesCompletes || [];
        this.total = tout.length;
        this.totalPages = Math.max(1, Math.ceil(this.total / this.pageSize));
        if (this.pageIndex > this.totalPages) {
            this.pageIndex = this.totalPages;
        }
        const debut = (this.pageIndex - 1) * this.pageSize;
        this.allRows = tout.slice(debut, debut + this.pageSize);
        this.applyFilter();
    }

    // ── Pied de pagination ────────────────────────────────────────────
    get nbPages(): number {
        return Math.max(1, this.totalPages || 1);
    }

    /**
     * Les numéros de page à afficher : 1 2 3 … 67, resserrés autour de la page
     * courante. `sep: true` marque une coupure (les points de suspension).
     *
     * Le tableau est mémorisé : s'il était reconstruit à chaque détection de
     * changement (et il y en a une à chaque mouvement de souris, à cause de
     * l'écouteur `pointermove` de l'ascenseur), le `*ngFor` recréerait les
     * boutons entre le `mousedown` et le `mouseup` — le navigateur n'émettrait
     * alors jamais l'événement `click` et la pagination resterait muette.
     */
    private clePages: string = '';
    private cachePages: Array<{ num: number; sep: boolean }> = [];

    get pagesAffichees(): Array<{ num: number; sep: boolean }> {
        const cle = `${this.pageIndex}/${this.nbPages}`;
        if (cle !== this.clePages) {
            this.clePages = cle;
            this.cachePages = this.construirePages();
        }
        return this.cachePages;
    }

    /** Identité stable pour le *ngFor des numéros de page. */
    trackPage = (index: number, p: { num: number; sep: boolean }) => p.sep ? `sep-${index}` : `page-${p.num}`;

    private construirePages(): Array<{ num: number; sep: boolean }> {
        const n = this.nbPages;
        const courante = this.pageIndex;
        const page = (num: number) => ({num, sep: false});
        const coupure = () => ({num: 0, sep: true});

        if (n <= 7) {
            return Array.from({length: n}, (_, i) => page(i + 1));
        }

        const liste: Array<{ num: number; sep: boolean }> = [page(1)];
        const debut = Math.max(2, courante - 1);
        const fin = Math.min(n - 1, courante + 1);

        if (debut > 2) liste.push(coupure());
        for (let i = debut; i <= fin; i++) liste.push(page(i));
        if (fin < n - 1) liste.push(coupure());

        liste.push(page(n));
        return liste;
    }

    allerPage(page: number): void {
        const cible = Math.min(Math.max(page || 1, 1), this.nbPages);
        if (cible === this.pageIndex) return;
        this.pageIndex = cible;
        this.loadJournal(false);
    }

    changerTaille(taille: number): void {
        if (!taille || taille === this.pageSize) return;
        this.pageSize = taille;
        this.pageIndex = 1;
        this.loadJournal(false);
    }

    // ── Tri par colonne : asc → desc → aucun (sur la page affichée) ───
    sortBy(key: string): void {
        if (this.sortKey !== key) {
            this.sortKey = key;
            this.sortOrder = 'asc';
        } else if (this.sortOrder === 'asc') {
            this.sortOrder = 'desc';
        } else {
            this.sortKey = '';
            this.sortOrder = '';
        }
        this.applyFilter();
    }

    private applySort(): void {
        if (!this.sortKey || !this.sortOrder) return;
        const key = this.sortKey;
        const dir = this.sortOrder === 'desc' ? -1 : 1;
        this.rows = [...this.rows].sort((a: any, b: any) => {
            const va = a?.[key];
            const vb = b?.[key];
            if (typeof va === 'number' && typeof vb === 'number') {
                return (va - vb) * dir;
            }
            return String(va ?? '').localeCompare(String(vb ?? '')) * dir;
        });
    }

    // ══ Ascenseur horizontal personnalisé ═════════════════════════════
    ngAfterViewInit(): void {
        setTimeout(() => this.syncHScroll());
    }

    @HostListener('window:resize')
    syncHScroll(): void {
        const el = this.tableWrap?.nativeElement;
        if (!el) return;

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
        if (!el || !bar) return;

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
        if (!this.dragging) return;
        const el = this.tableWrap?.nativeElement;
        const bar = this.hBar?.nativeElement;
        if (!el || !bar) return;

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

    private mapRow(e: any): JournalRow {
        const dateVal = e?.date_en || e?.created_at || '';
        const p = e?.iduser_save?.datapersonnel ||  null;
        const nom = p ? `${p?.nom || ''} ${p?.prenom || ''}`.trim() : '';

        return {
            uid: e?.uid || e?.idhistopiecedocs || '',
            entite: e?.societe?.raison_sociale || e?.datasociete?.raison_sociale || '',
            numero_doc: e?.piece_docs?.code_docs || e?.code_docs || '',   // à compléter
            action_doc: '',                                                  // à compléter
            direction: e?.service_tree?  e?.service_tree[0]?.libelle ||'' : '',                                                   // à compléter
            service: e?.dataservice?.libelle || e?.dataservices?.libelle || e?.service.lib_service || '',
            type_doc: '',                                                    // à compléter
            action_logs: e?.action_logs || '',
            par_qui: nom || e?.datauser?.email || '',
            date: dateVal ? moment(dateVal).format('DD/MM/YYYY HH:mm') : '',
            autorise: '',                                                    // à compléter
            ts: dateVal ? moment(dateVal).valueOf() : 0,
            raw: e,
            societe: e?.societe,
            datapersonnel: e?.datapersonnel,
        };
    }

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
        this.applySort();
        // Les colonnes changent de largeur avec le contenu : on recalcule l'ascenseur
        setTimeout(() => this.syncHScroll());
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
    /**
     * L'export porte sur le journal entier (filtres en cours), pas sur la seule
     * page affichée : on redemande la liste en une fois au serveur.
     */
    private chargerToutesLesLignes(): Promise<JournalRow[]> {
        const taille = Math.max(this.total || 0, this.pageSize, 1);
        return this.httService.getData(this.buildUrl(1, taille), false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                const body = res?.body || {};
                if (!(body.status || body.success)) return [...this.rows];
                return (body.data || []).map((e: any) => this.mapRow(e));
            })
            .catch(() => [...this.rows]);
    }

    private exportRows(lignes: JournalRow[]): any[] {
        return lignes.map(r => ({
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

    async exportExcel(): Promise<void> {
        if (!this.rows.length || this.isExporting) return;
        this.isExporting = true;
        const lignes = await this.chargerToutesLesLignes();
        this.isExporting = false;
        if (!lignes.length) return;
        const ws = XLSX.utils.json_to_sheet(this.exportRows(lignes));
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
    private drawPdfHeader(doc: jsPDF, nombreActions: number): number {
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
        drawKV("Nombre d'actions", String(nombreActions), colX2, ky + 7);

        // ── Titre (sobre : texte navy centré) ──
        const titleY = panelY + panelH + 10;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.setTextColor(...NAVY);
        doc.text('JOURNAL DES OPÉRATIONS', pageW / 2, titleY, {align: 'center'});

        return titleY + 8;
    }

    async exportPdf(): Promise<void> {
        if (!this.rows.length || this.isExporting) return;
        this.isExporting = true;
        const lignes = await this.chargerToutesLesLignes();
        this.isExporting = false;
        if (!lignes.length) return;
        const doc = new jsPDF({orientation: 'landscape', unit: 'mm', format: 'a4'});

        // Chargement du logo (best-effort)
        try {
            (this as any)._pdfLogo = await this.loadImage('assets/images/logo/logo_apw_full.png');
        } catch {
            (this as any)._pdfLogo = null;
        }

        const startY = this.drawPdfHeader(doc, lignes.length);

        autoTable(doc, {
            startY,
            head: [['Entité', 'Numéro doc.', 'Action doc.', 'Direction', 'Service',
                'Type de doc.', 'Action', 'Par qui ?', 'Date', 'Autorisé']],
            body: lignes.map(r => [
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
