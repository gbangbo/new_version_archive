import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import moment from "moment";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";

interface RowData {
    lib_document: string;
    code_document: string;
    date_document: string;
    email_received: string;
    destinataires: string[];
    message_send: string;
    nb_fichiers: number;
    protege: boolean;
    file_password: string;
    showPassword: boolean;
    date_envoi: string;
}

interface SentFile {
    uid: string;
    name: string;
    extension: string;
    url: string;
    password: string;
}

@Component({
    selector: 'app-documents-envoyes',
    imports: [
        CommonModule,
        CardComponent,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule,
        FeatherIconComponent,
    ],
    templateUrl: './documents-envoyes.component.html',
    styleUrl: './documents-envoyes.component.scss',
})
export class DocumentsEnvoyesComponent implements OnInit, AfterViewInit {

    private users: any = [];
    isloading: boolean = false;
    searchValue = '';

    filteredData: RowData[] = [];
    private dataMails: any = [];

    // ── Consultation des fichiers envoyés ──────────────────────
    filesOpen: boolean = false;
    filesTitle: string = '';
    filesPassword: string = '';
    filesList: SentFile[] = [];

    // Aperçu (panneau glissant + déchiffrement pdfjs)
    previewingUid: string | null = null;
    previewOpen: boolean = false;
    previewFileItem: SentFile | null = null;
    previewLoading: boolean = false;
    previewError: string = '';
    previewImages: string[] = [];
    previewImageUrl: string = '';
    previewIsImage: boolean = false;
    currentPreviewPage: number = 1;
    previewZoom: number = 1;
    readonly minZoom: number = 0.5;
    readonly maxZoom: number = 3;
    readonly zoomStep: number = 0.25;

    // ── Tri ──────────────────────────────────────────────────
    // ── Tri (clic sur l'entête) ───────────────────────────────
    sortKey: string = '';
    sortOrder: 'asc' | 'desc' | '' = '';

    // ── Pagination (la liste est chargée en une fois) ─────────
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


    constructor(private autor: Authorization, private httService: HttpService, private cdr: ChangeDetectorRef) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showSendMails(this.users?.datasociete?.uid, this.users?.uid);
    }

    // ── Recherche globale ─────────────────────────────────────
    onSearch(value: string): void {
        const val = value.trim().toLowerCase();
        this.filteredData = val
            ? this.dataMails.filter((row: any) =>
                Object.values(row).some(v => String(v).toLowerCase().includes(val)))
            : [...this.dataMails];
        this.applySort();
        this.pageIndex = 1;               // une nouvelle recherche repart de la première page
        setTimeout(() => this.syncHScroll());
    }

    togglePassword(row: RowData): void {
        row.showPassword = !row.showPassword;
    }

    // ── Consultation des fichiers envoyés ──────────────────────
    openFiles(row: any): void {
        this.filesTitle = row?.lib_document || 'Fichiers envoyés';
        this.filesPassword = row?.file_password || '';
        this.filesList = (row?.pieces_docs || []).map((p: any) => {
            const url = p?.url_file_piece || p?.url_file || '';
            const ext = (this.getFileExtension(p?.lib_piece_docs || url) || '').toLowerCase();
            return {
                uid: p?.uid,
                name: p?.name_piece_docs || p?.lib_piece_docs || 'Fichier',
                extension: ext,
                url,
                password: p?.password_file || '',
            };
        });
        this.filesOpen = true;
        this.closePreview();
    }

    closeFiles(): void {
        this.filesOpen = false;
        this.closePreview();
        this.filesList = [];
    }

    getProxyUrl(url: string): string {
        return environment.production ? url : url.replace(`${environment.URL_API}`, '');
    }

    getFileExtension(url: string): string {
        if (!url) return '';
        const clean = url.split('?')[0].split('#')[0];
        return (clean.split('.').pop() || '').toLowerCase();
    }

    isImage(ext: string): boolean {
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes((ext || '').toLowerCase());
    }

    fileIcon(ext: string): string {
        const e = (ext || '').toLowerCase();
        if (e === 'pdf') return 'file-pdf';
        if (this.isImage(e)) return 'file-image';
        if (['doc', 'docx'].includes(e)) return 'file-word';
        if (['xls', 'xlsx'].includes(e)) return 'file-excel';
        if (['ppt', 'pptx'].includes(e)) return 'file-ppt';
        return 'file';
    }

    async previewFile(file: SentFile): Promise<void> {
        if (!file?.url || this.previewingUid) return;
        const url = this.getProxyUrl(file.url);
        const ext = (file.extension || this.getFileExtension(file.url)).toLowerCase();

        this.previewFileItem = file;
        this.previewOpen = true;
        this.previewError = '';
        this.previewImages = [];
        this.previewImageUrl = '';
        this.previewIsImage = false;
        this.currentPreviewPage = 1;
        this.previewZoom = 1;

        if (this.isImage(ext)) {
            this.previewIsImage = true;
            this.previewImageUrl = url;
            return;
        }
        if (ext === 'pdf') {
            await this.renderPdfPreview(file, url);
            return;
        }
        this.previewError = 'Ce type de fichier ne peut pas être prévisualisé ici.';
    }

    private async renderPdfPreview(file: SentFile, url: string): Promise<void> {
        this.previewingUid = file.uid;
        this.previewLoading = true;
        this.previewImages = [];
        try {
            const password = file.password || this.filesPassword || undefined;
            const pdf: any = await pdfjsLib.getDocument({url, password}).promise;
            for (let i = 1; i <= pdf.numPages; i++) {
                try {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({scale: 1.5});
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    await page.render({canvasContext: canvas.getContext('2d')!, viewport}).promise;
                    this.previewImages = [...this.previewImages, canvas.toDataURL('image/png')];
                    if (i === 1) this.previewLoading = false;
                    this.cdr.detectChanges();
                } catch { /* page illisible : on continue */ }
            }
            if (!this.previewImages.length) {
                this.previewError = "Impossible d'ouvrir ce fichier pour la prévisualisation.";
            }
        } catch {
            this.previewError = "Impossible d'ouvrir ce fichier pour la prévisualisation.";
        } finally {
            this.previewLoading = false;
            this.previewingUid = null;
            this.cdr.detectChanges();
        }
    }

    closePreview(): void {
        this.previewOpen = false;
        this.previewFileItem = null;
        this.previewImages = [];
        this.previewImageUrl = '';
        this.previewIsImage = false;
        this.previewError = '';
        this.currentPreviewPage = 1;
        this.previewZoom = 1;
    }

    prevPage(): void {
        if (this.currentPreviewPage > 1) this.currentPreviewPage--;
    }

    nextPage(): void {
        if (this.currentPreviewPage < this.previewImages.length) this.currentPreviewPage++;
    }

    zoomIn(): void {
        this.previewZoom = Math.min(this.maxZoom, +(this.previewZoom + this.zoomStep).toFixed(2));
    }

    zoomOut(): void {
        this.previewZoom = Math.max(this.minZoom, +(this.previewZoom - this.zoomStep).toFixed(2));
    }

    resetZoom(): void {
        this.previewZoom = 1;
    }

    showSendMails(idsociete: string = '', iduser_save: string = '') {
        this.isloading = true;
        this.dataMails = [];
        this.filteredData = [];
        this.httService.getData(
            `${environment.api_url}api/:save-send-mails?idsociete=${idsociete}&iduser_save=${iduser_save}`,
            false,
            this.users?.access_token || ''
        )
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("save-send-mails ===", res.body);
                if (res.body.status || res.body.success) {

                    this.dataMails = (res.body.data || []).map((e: any) => {
                        const doc = e?.documents || {};
                        const emails = (e?.email_received || '')
                            .split(/[;,]/).map((s: string) => s.trim()).filter((s: string) => s);
                        const pieces = e?.pieces_docs || [];

                        return {
                            ...e,
                            lib_document: doc?.lib_docs || '—',
                            code_document: doc?.code_docs || '',
                            date_document: doc?.date_docs ? moment(doc.date_docs).format('DD/MM/YYYY') : '',
                            email_received: emails.join(', '),
                            destinataires: emails,
                            message_send: e?.message_send || '',
                            nb_fichiers: Array.isArray(pieces) ? pieces.length : 0,
                            protege: !!(e?.pwd_statut || e?.file_password),
                            file_password: e?.file_password || '',
                            showPassword: false,
                            date_envoi: this.formatDate(e?.created_at),
                        };
                    });

                    this.filteredData = [...this.dataMails];
                    this.applySort();
                    setTimeout(() => this.syncHScroll());
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    private buildFilter(key: keyof RowData): { text: string; value: string }[] {
        return [...new Set(this.dataMails
            ?.filter((e: any) => e?.[key])
            .map((e: any) => e[key]))]
            .map((v: any) => ({text: v, value: v}));
    }

    private formatDate(value: any): string {
        if (!value) return '';
        const m = moment(value);
        return m.isValid() ? m.format('DD/MM/YYYY HH:mm') : '';
    }

    exportToExcel(): void {
        const source = this.filteredData?.length ? this.filteredData : this.dataMails;
        if (!source?.length) return;

        const rows = source.map((row: any) => ({
            'Numéro': row.code_document || '',
            'Document': row.lib_document || '',
            'Destinataire(s)': row.email_received || '',
            'Nombre de fichiers': row.nb_fichiers || 0,
            'Protégé': row.protege ? 'Oui' : 'Non',
            'Message': row.message_send || '',
            'Date d\'envoi': row.date_envoi || '',
        }));

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Documents envoyés');

        const colWidths = Object.keys(rows[0] || {}).map(key => ({
            wch: Math.max(key.length, ...rows.map((r: any) => String(r[key] || '').length)) + 2
        }));
        ws['!cols'] = colWidths;

        const fileName = `documents_envoyes_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }

    // ── Tri par colonne : asc -> desc -> aucun ────────────────
    sortBy(key: string): void {
        if (this.sortKey !== key) {
            this.sortKey = key;
            this.sortOrder = 'asc';
        } else if (this.sortOrder === 'asc') {
            this.sortOrder = 'desc';
        } else {
            this.sortKey = '';
            this.sortOrder = '';
            this.onSearch(this.searchValue);   // on retrouve l'ordre initial, recherche conservée
            return;
        }
        this.applySort();
    }

    private applySort(): void {
        if (!this.sortKey || !this.sortOrder) {
            return;
        }
        const key = this.sortKey;
        const dir = this.sortOrder === 'desc' ? -1 : 1;
        this.filteredData = [...this.filteredData].sort((a: any, b: any) =>
            String(a?.[key] ?? '').localeCompare(String(b?.[key] ?? '')) * dir
        );
    }

    // ── Pagination ───────────────────────────────────────────
    // La liste arrive en une fois : la pagination ne fait que découper
    // `filteredData`.

    get nbPages(): number {
        return Math.max(1, Math.ceil(this.filteredData.length / this.pageSize));
    }

    get rowsPage(): any[] {
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
