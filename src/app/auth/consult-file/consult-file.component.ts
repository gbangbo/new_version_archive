import {Component, OnInit, ChangeDetectorRef, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NzSplitterModule} from 'ng-zorro-antd/splitter';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import * as pdfjsLib from 'pdfjs-dist';
import {HttpService} from "../../core/http.service";
import {API_URL} from "../../core/config";
import {environment} from "../../../environments/environment";

interface FileItem {
    uid: string;
    name: string;
    extension: string;
    url_file: string;
    password_file?: string;
    size?: string;
    nombre_page?: string;
    date_send?: string;
}

/* En-tête du document porteur des pièces */
interface DocumentInfo {
    uid: string;
    code_docs: string;
    lib_docs: string;
    desc_docs: string;
    date_docs: string;
    date_sig: string;
    societe: string;
    type_document: string;
    proprietes: { propriete: string; valeur: string }[];
}

@Component({
    selector: 'app-consult-file',
    imports: [CommonModule, FormsModule, NzSplitterModule, NzIconModule],
    templateUrl: './consult-file.component.html',
    styleUrl: './consult-file.component.scss',
})
export class ConsultFileComponent implements OnInit {

    idDocument: string = '';
    isloading: boolean = false;
    errorMessage: string = '';
    docInfo: DocumentInfo | null = null;
    files: FileItem[] = [];
    selectedFile: FileItem | null = null;
    isLoadingPreview: boolean = false;
    searchQuery: string = '';
    listCollapsed: boolean = false;
    isMobile: boolean = window.innerWidth <= 768;

    @HostListener('window:resize')
    onResize(): void {
        this.isMobile = window.innerWidth <= 768;
    }

    /* ── Toolbar state ── */
    zoomLevel: number = 1.0;
    rotation: number = 0;
    isFullscreen: boolean = false;

    currentPage: number = 1;
    totalPages: number = 0;

    /* ── Office preview ── */
    officePreviewUrl: SafeResourceUrl | null = null;

    private readonly ZOOM_STEP = 0.25;
    private readonly ZOOM_MIN = 0.25;
    private readonly ZOOM_MAX = 4.0;
    private readonly OFFICE_EXTENSIONS = ['doc', 'docx', 'xls', 'xlsx'];
    private officeLoaderTimer: any = null;
    private currentPdfUrl: string = '';
    private currentPdfPwd: string = '';
    private currentPdfDoc: any = null;

    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef,
        private httService: HttpService,
    ) {
    }

    ngOnInit(): void {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
        this.route.queryParamMap.subscribe(params => {
            this.loadFiles(params.get('uid') ?? '', params.get('token') ?? '');
            // appel API ici
        });

        //  this.idDocument = this.route.snapshot.paramMap.get('id') || '';

    }

    /* ────────────────────────────────────────
       Chargement des fichiers
       (simulation — à remplacer par l'appel API
       de consultation des fichiers reçus)
    ──────────────────────────────────────── */
    loadFiles(uid: string, token: string): void {
        if (!uid || !token) {
            this.errorMessage = 'Lien de consultation invalide ou incomplet.';
            this.isloading = false;
            this.cdr.detectChanges();
            return;
        }

        this.isloading = true;
        this.errorMessage = '';

        const url = `${environment.api_url}api/:documents/:recu-elements`
            + `?uid=${encodeURIComponent(uid)}&token=${encodeURIComponent(token)}`;

        this.httService.getData(url, false, token)
            .toPromise()
            .then((res: any) => {
                let body:any = res?.body;
                console.log('[consult-file] réponse API :', body );

                if (body?.status || body?.success) {
                    const doc = body.data;
                    this.docInfo = this.mapDocInfo(doc);
                    this.files = this.mapFiles(doc?.pieces ?? [], doc?.date_docs, doc?.password_file);
                    if (!this.files.length) {
                        this.errorMessage = 'Aucun fichier disponible pour ce lien.';
                    }
                } else {
                    this.errorMessage = body?.message || 'Impossible de charger les fichiers.';
                }
            })
            .catch((err: any) => {
                console.error('[consult-file] échec de l\'appel API :', err);
                this.errorMessage = err?.error?.message || 'Erreur réseau lors du chargement des fichiers.';
            })
            .finally(() => {
                this.isloading = false;
                this.cdr.detectChanges();
            });
    }

    /* Normalise le bloc `data` vers l'en-tête du document */
    private mapDocInfo(d: any): DocumentInfo | null {
        if (!d) return null;
        return {
            uid: d.uid ?? '',
            code_docs: d.code_docs ?? '',
            lib_docs: d.lib_docs ?? '',
            desc_docs: d.desc_docs ?? '',
            date_docs: this.formatDate(d.date_docs),
            date_sig: this.formatDate(d.date_sig),
            societe: d.societe?.raison_sociale ?? '',
            type_document: d.type_document?.libelle_type_docs ?? '',
            proprietes: Array.isArray(d.proprietes)
                ? d.proprietes.map((p: any) => ({propriete: p.propriete, valeur: p.valeur}))
                : [],
        };
    }

    /* Normalise `data.pieces` vers le modèle FileItem */
    private mapFiles(rows: any, dateDocs?: string, docPassword?: string): FileItem[] {
        if (!Array.isArray(rows)) return [];
        return rows.map((r: any) => ({
            uid: r.uid ?? '',
            name: r.name_piece_docs ?? 'Document',
            // Le serveur renvoie l'extension avec le point (".pdf")
            extension: (r.extension_piece_docs ?? '').toString().replace(/^\./, '').toLowerCase(),
            url_file: r.url_file ?? r.url_file_piece ?? '',
            // Mot de passe de lecture : porté par la pièce, sinon par le document
            password_file: r.password_file ?? r.password_piece_docs ?? docPassword ?? '',
            // `taille_piece_docs` est exprimée en kilo-octets
            size: this.formatSize(r.taille_piece_docs),
            nombre_page: r.nombre_page != null ? String(r.nombre_page) : undefined,
            date_send: this.formatDate(dateDocs),
        }));
    }

    /* "129.4375" (Ko) → "129 Ko" | "1,2 Mo" */
    private formatSize(kb: any): string | undefined {
        const value = parseFloat(kb);
        if (isNaN(value)) return undefined;
        if (value >= 1024) return `${(value / 1024).toFixed(1).replace('.', ',')} Mo`;
        return `${Math.round(value)} Ko`;
    }

    /* "2026-06-26" → "26/06/2026" */
    private formatDate(iso: any): string {
        if (!iso) return '';
        const parts = String(iso).split('-');
        if (parts.length !== 3) return String(iso);
        return `${parts[2].slice(0, 2)}/${parts[1]}/${parts[0]}`;
    }

    /* ────────────────────────────────────────
       RECHERCHE dans la liste
    ──────────────────────────────────────── */
    get filteredFiles(): FileItem[] {
        const q = this.searchQuery.trim().toLowerCase();
        if (!q) return this.files;
        return this.files.filter(f =>
            (`${f.name}.${f.extension}`).toLowerCase().includes(q)
        );
    }

    clearSearch(): void {
        this.searchQuery = '';
    }

    toggleList(): void {
        this.listCollapsed = !this.listCollapsed;
    }

    highlightMatch(text: string, query: string): SafeHtml {
        if (!query.trim()) return this.sanitizer.bypassSecurityTrustHtml(this.escapeHtml(text));
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const highlighted = this.escapeHtml(text).replace(
            new RegExp(`(${escaped})`, 'gi'),
            '<mark class="hl">$1</mark>'
        );
        return this.sanitizer.bypassSecurityTrustHtml(highlighted);
    }

    private escapeHtml(text: string): string {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    /* ────────────────────────────────────────
       Clic sur un fichier
    ──────────────────────────────────────── */
    onFileClick(file: FileItem): void {
        if (this.selectedFile?.uid === file.uid) return;
        this.selectedFile = file;
        this.zoomLevel = 1.0;
        this.rotation = 0;
        this.currentPage = 1;
        this.totalPages = 0;
        this.currentPdfDoc = null;
        this.officePreviewUrl = null;
        this.isLoadingPreview = true;

        // Sur mobile, on replie la liste pour laisser la place à l'aperçu
        if (this.isMobile) this.listCollapsed = true;

        const ext = (file.extension || '').toLowerCase();

        if (ext === 'pdf') {
            this.currentPdfUrl = file.url_file;
            this.currentPdfPwd = file.password_file || '';
            setTimeout(() => this.renderPdf(this.currentPdfUrl, this.currentPdfPwd), 50);
        } else if (this.isOffice(ext)) {
            this.startOfficeLoaderTimer();
            this.officePreviewUrl = this.getOfficePreviewUrl(file.url_file);
        } else if (!this.isImage(ext)) {
            this.isLoadingPreview = false;
        }
    }

    /* ────────────────────────────────────────
       ZOOM
    ──────────────────────────────────────── */
    get zoomPercent(): number {
        return Math.round(this.zoomLevel * 100);
    }

    zoomIn(): void {
        if (this.zoomLevel >= this.ZOOM_MAX) return;
        this.zoomLevel = Math.min(this.ZOOM_MAX, +(this.zoomLevel + this.ZOOM_STEP).toFixed(2));
        this.applyZoom();
    }

    zoomOut(): void {
        if (this.zoomLevel <= this.ZOOM_MIN) return;
        this.zoomLevel = Math.max(this.ZOOM_MIN, +(this.zoomLevel - this.ZOOM_STEP).toFixed(2));
        this.applyZoom();
    }

    resetZoom(): void {
        this.zoomLevel = 1.0;
        this.applyZoom();
    }

    private applyZoom(): void {
        if ((this.selectedFile?.extension || '').toLowerCase() === 'pdf') {
            this.isLoadingPreview = true;
            setTimeout(() => this.renderPage(this.currentPage), 50);
        }
    }

    /* ────────────────────────────────────────
       ROTATION
    ──────────────────────────────────────── */
    rotateLeft(): void {
        this.rotation = (this.rotation - 90 + 360) % 360;
        if ((this.selectedFile?.extension || '').toLowerCase() === 'pdf') {
            this.isLoadingPreview = true;
            setTimeout(() => this.renderPage(this.currentPage), 50);
        }
    }

    rotateRight(): void {
        this.rotation = (this.rotation + 90) % 360;
        if ((this.selectedFile?.extension || '').toLowerCase() === 'pdf') {
            this.isLoadingPreview = true;
            setTimeout(() => this.renderPage(this.currentPage), 50);
        }
    }

    /* ────────────────────────────────────────
       NAVIGATION PDF
    ──────────────────────────────────────── */
    nextPage(): void {
        if (this.currentPage >= this.totalPages) return;
        this.currentPage++;
        this.isLoadingPreview = true;
        setTimeout(() => this.renderPage(this.currentPage), 50);
    }

    prevPage(): void {
        if (this.currentPage <= 1) return;
        this.currentPage--;
        this.isLoadingPreview = true;
        setTimeout(() => this.renderPage(this.currentPage), 50);
    }

    goToPage(value: string): void {
        const page = parseInt(value, 10);
        if (isNaN(page)) return;
        const clamped = Math.max(1, Math.min(this.totalPages, page));
        if (clamped === this.currentPage) return;
        this.currentPage = clamped;
        this.isLoadingPreview = true;
        setTimeout(() => this.renderPage(this.currentPage), 50);
    }

    /* ────────────────────────────────────────
       IMPRESSION
    ──────────────────────────────────────── */
    async printFile(): Promise<void> {
        if (!this.selectedFile?.url_file) return;
        const ext = (this.selectedFile.extension || '').toLowerCase();
        if (ext === 'pdf') {
            await this.printPdf();
        } else if (this.isImage(ext)) {
            this.printImage();
        }
    }

    private async printPdf(): Promise<void> {
        if (!this.currentPdfDoc) return;

        this.isLoadingPreview = true;
        this.cdr.detectChanges();

        const dataUrls: string[] = [];
        for (let i = 1; i <= this.totalPages; i++) {
            const page = await this.currentPdfDoc.getPage(i);
            const offscreen = document.createElement('canvas');
            const ctx = offscreen.getContext('2d')!;
            const viewport = page.getViewport({scale: 2.0, rotation: 0});
            offscreen.width = viewport.width;
            offscreen.height = viewport.height;
            await page.render({canvasContext: ctx, viewport}).promise;
            dataUrls.push(offscreen.toDataURL('image/png'));
        }

        this.isLoadingPreview = false;
        this.cdr.detectChanges();

        const pagesHtml = dataUrls.map(url =>
            `<div class="p"><img src="${url}"/></div>`
        ).join('');

        const win = window.open('', '_blank');
        if (!win) return;
        win.document.write(`<!DOCTYPE html>
<html><head><title>Impression</title><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#fff}
  .p{page-break-after:always;page-break-inside:avoid}
  .p:last-child{page-break-after:auto}
  img{width:100%;display:block}
  @page{margin:8mm}
</style></head>
<body>${pagesHtml}</body></html>`);
        win.document.close();
        win.onload = () => {
            win.focus();
            win.print();
            win.onafterprint = () => win.close();
        };
    }

    private printImage(): void {
        if (!this.selectedFile?.url_file) return;
        const url = this.selectedFile.url_file;
        const win = window.open('', '_blank');
        if (!win) return;
        win.document.write(`<!DOCTYPE html>
<html><head><title>Impression</title><style>
  *{margin:0;padding:0}
  body{background:#fff;display:flex;justify-content:center;align-items:flex-start}
  img{max-width:100%;display:block}
  @page{margin:8mm}
</style></head>
<body><img src="${url}"
  onload="window.focus();window.print();window.onafterprint=function(){window.close()}"/>
</body></html>`);
        win.document.close();
    }

    /* ────────────────────────────────────────
       TÉLÉCHARGEMENT
    ──────────────────────────────────────── */
    async downloadFile(): Promise<void> {
        if (!this.selectedFile?.url_file) return;
        const url = this.selectedFile.url_file;
        const filename = `${this.selectedFile.name}.${this.selectedFile.extension}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('fetch failed');
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        } catch {
            window.open(url, '_blank');
        }
    }

    /* ────────────────────────────────────────
       PLEIN ÉCRAN
    ──────────────────────────────────────── */
    toggleFullscreen(): void {
        const el = document.querySelector('.preview-panel') as HTMLElement;
        if (!document.fullscreenElement) {
            el?.requestFullscreen();
            this.isFullscreen = true;
        } else {
            document.exitFullscreen();
            this.isFullscreen = false;
        }
    }

    /* ────────────────────────────────────────
       RENDU PDF (pdfjs)
    ──────────────────────────────────────── */
    renderPdf(url: string, pwd: string, retry: boolean = false): void {
        this.currentPage = 1;
        this.currentPdfDoc = null;
        const loadingTask = pdfjsLib.getDocument({url, password: pwd});
        loadingTask.promise
            .then((pdf: any) => {
                this.currentPdfDoc = pdf;
                this.totalPages = pdf.numPages;
                // Mémorise le mot de passe accepté : il resservira à l'impression
                // et à un éventuel nouveau rendu de la même pièce.
                this.currentPdfPwd = pwd;
                this.renderPage(this.currentPage);
            })
            .catch((err: any) => {
                this.isLoadingPreview = false;
                this.cdr.detectChanges();

                if (err?.name !== 'PasswordException') return;

                // On ne redemande que si le mot de passe fourni par l'API
                // est absent ou refusé par le fichier.
                const message = retry || pwd
                    ? 'Mot de passe incorrect. Réessayer :'
                    : 'Ce PDF est protégé. Saisir le mot de passe :';

                const pass = prompt(message);
                if (pass) this.renderPdf(url, pass, true);
            });
    }

    private renderPage(pageNum: number): void {
        if (!this.currentPdfDoc) return;
        this.currentPdfDoc.getPage(pageNum).then((page: any) => {
            const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const scale = this.zoomLevel * 1.5;
            const viewport = page.getViewport({scale, rotation: this.rotation});
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({canvasContext: ctx!, viewport}).promise.then(() => {
                setTimeout(() => {
                    this.isLoadingPreview = false;
                    this.cdr.detectChanges();
                }, 0);
            });
        });
    }

    /* ────────────────────────────────────────
       Callbacks de chargement
    ──────────────────────────────────────── */
    onPreviewLoaded(): void {
        setTimeout(() => {
            this.isLoadingPreview = false;
        }, 0);
    }

    onOfficePreviewLoaded(): void {
        // Le viewer Office déclenche "load" plusieurs fois (redirections internes).
        // On annule le timer de secours et masque le loader directement.
        if (this.officeLoaderTimer) {
            clearTimeout(this.officeLoaderTimer);
            this.officeLoaderTimer = null;
        }
        this.isLoadingPreview = false;
    }

    private startOfficeLoaderTimer(): void {
        if (this.officeLoaderTimer) clearTimeout(this.officeLoaderTimer);
        this.officeLoaderTimer = setTimeout(() => {
            this.isLoadingPreview = false;
            this.officeLoaderTimer = null;
        }, 10_000);
    }

    /* ────────────────────────────────────────
       Helpers
    ──────────────────────────────────────── */
    getOfficePreviewUrl(fileUrl: string): SafeResourceUrl {
        const url = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    isImage(extension: string): boolean {
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes((extension || '').toLowerCase());
    }

    isOffice(extension: string): boolean {
        return this.OFFICE_EXTENSIONS.includes((extension || '').toLowerCase());
    }
}
