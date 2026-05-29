import {Component, OnInit, ChangeDetectorRef, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzSplitterModule} from "ng-zorro-antd/splitter";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTreeFlatDataSource, NzTreeFlattener, NzTreeViewModule} from 'ng-zorro-antd/tree-view';
import {Authorization} from "../../../protect/authorization.service";
import {environment} from "../../../../environments/environment";
import {HttpService} from "../../../core/http.service";
import {SelectionModel} from "@angular/cdk/collections";
import {FlatTreeControl} from "@angular/cdk/tree";
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import * as pdfjsLib from 'pdfjs-dist';

interface PreviewNode {
    name: string;
    key?: string;
    uid?: string;
    extension?: string;
    url_file?: string;
    desc_ocr_text?: string;
    nombre_page?: string;
    iduser_save?: string;
    password_file?: string;
    isFile?: boolean;
    disabled?: boolean;
    children?: PreviewNode[];
}

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    extension: string;
    url_file: string;
    desc_ocr_text: string;
    nombre_page: string;
    uid: string;
    iduser_save: string;
    password_file: string;
    level: number;
    disabled: boolean;
    isFile: boolean;
}

@Component({
    selector: 'app-pre-view-doc',
    imports: [CommonModule, FormsModule, NzSplitterModule, NzTreeViewModule, NzIconModule],
    templateUrl: './pre-view-doc.component.html',
    styleUrl: './pre-view-doc.component.scss',
})
export class PreViewDocComponent implements OnInit {

    sessionData: any = null;
    users: any = [];
    isloading: boolean = false;
    selectedFile: ExampleFlatNode | null = null;
    isLoadingPreview: boolean = false;
    searchQuery: string = '';
    treeCollapsed: boolean = false;
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

    /* ── Tree setup ── */
    private transformer = (node: PreviewNode, level: number): ExampleFlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        extension: node.extension || '',
        url_file: node.url_file || '',
        desc_ocr_text: node.desc_ocr_text || '',
        nombre_page: node.nombre_page || '',
        uid: node.uid || node.key || '',
        iduser_save: node.iduser_save || '',
        password_file: node.password_file || '',
        isFile: !!node.isFile,
        level,
        disabled: !!node.disabled
    });

    selectListSelection = new SelectionModel<ExampleFlatNode>();

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable
    );

    treeFlattener = new NzTreeFlattener(
        this.transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );

    dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);
    treeData: PreviewNode[] = [];

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
        this.users = this.autor.getInfosUsers();
        this.sessionData = this.autor.getInfosPreview();
        const uidTypeDoc = this.sessionData?.datatype_document?.[0]?.uid || '';
        this.showCatOrder('', uidTypeDoc, '');
        console.log('sessionData ====', this.sessionData);
    }

    hasChild = (_: number, node: ExampleFlatNode): boolean => node.expandable;

    /* ────────────────────────────────────────
       Chargement de l'arbre
    ──────────────────────────────────────── */
    showCatOrder(idsociete: string = '', idtype_document: string = '', idcategories: string = '') {
        this.isloading = true;
        this.httService
            .getData(
                `${environment.api_url}api/:save-categorie-plan-classement?idsociete=${idsociete}&idtype_document=${idtype_document}&idcategories=${idcategories}`,
                false,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    const rawData: any[] = res.body.data || [];
                    const withChildren = rawData.filter((d: any) => d.children?.length);
                    // Si aucun nœud racine n'a de sous-dossiers, on utilise tous les nœuds tels quels
                    const dataToMap = withChildren.length > 0 ? withChildren : rawData;
                    const mapped = this.mapApiToTree(dataToMap);
                    if (!mapped?.length) return;
                    this.treeData = mapped;
                    this.injectFilesIntoTree();
                    this.dataSource.setData([...this.treeData]);
                    setTimeout(() => this.treeControl.expandAll(), 300);
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    /* ────────────────────────────────────────
       RECHERCHE dans l'arbre
    ──────────────────────────────────────── */
    onSearchChange(): void {
        const q = this.searchQuery.trim();
        if (!q) {
            setTimeout(() => this.treeControl.expandAll(), 50);
            return;
        }
        // Ouvre automatiquement les ancêtres de chaque nœud correspondant
        setTimeout(() => {
            const lower = q.toLowerCase();
            this.treeControl.dataNodes?.forEach(node => {
                if ((node.name || '').toLowerCase().includes(lower)) {
                    this.expandAncestors(node);
                }
            });
        }, 50);
    }

    toggleTree(): void {
        this.treeCollapsed = !this.treeCollapsed;
    }

    clearSearch(): void {
        this.searchQuery = '';
        setTimeout(() => this.treeControl.expandAll(), 50);
    }

    private expandAncestors(node: ExampleFlatNode): void {
        const nodes = this.treeControl.dataNodes;
        const idx = nodes.indexOf(node);
        if (idx < 0) return;
        let targetLevel = node.level - 1;
        for (let i = idx - 1; i >= 0 && targetLevel >= 0; i--) {
            if (nodes[i].level === targetLevel) {
                this.treeControl.expand(nodes[i]);
                targetLevel--;
            }
        }
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

    mapApiToTree(data: any[]): PreviewNode[] {
        return data.map(item => ({
            name: item?.name_categories,
            key: item?.uid,
            uid: item?.uid,
            disabled: false,
            children: item.children?.length > 0
                ? this.mapApiToTree(item.children)
                : undefined
        }));
    }

    private mapFileToNode(d: any): PreviewNode {
        return {
            name: d.name_piece_docs || d.name_file_docs || d.name || '',
            key: d.uid,
            uid: d.uid,
            url_file: d.url_file || '',
            extension: this.getFileExtension(d.url_file || ''),
            desc_ocr_text: d.desc_ocr_text || '',
            nombre_page: d.nombre_page || '',
            password_file: d.password_file || '',
            iduser_save: d.iduser_save || '',
            isFile: true,
            disabled: false,
            children: undefined
        };
    }

    private injectFilesIntoTree(): void {
        const files: any[] = this.sessionData?.datasPiece || [];
        if (!this.treeData?.length || !files.length) return;

        for (const d of files) {
            const fileNode = this.mapFileToNode(d);
            const catUid = d.datacats?.uid;

            if (catUid) {
                const inserted = this.insertIntoCategory(this.treeData, catUid, fileNode);
                if (!inserted) {
                    this.appendToLastNode(fileNode);
                }
            } else {
                this.appendToLastNode(fileNode);
            }
        }
    }

    private insertIntoCategory(nodes: PreviewNode[], catUid: string, file: PreviewNode): boolean {
        for (const node of nodes) {
            if (node.uid === catUid || node.key === catUid) {
                if (!node.children) node.children = [];
                node.children.push(file);
                return true;
            }
            if (node.children?.length) {
                if (this.insertIntoCategory(node.children, catUid, file)) return true;
            }
        }
        return false;
    }

    private appendToLastNode(file: PreviewNode): void {
        if (!this.treeData?.length) return;
        const last = this.treeData[this.treeData.length - 1];
        if (!last.children) last.children = [];
        last.children.push(file);
    }

    /* ────────────────────────────────────────
       Clic sur nœud
    ──────────────────────────────────────── */
    onNodeClick(node: ExampleFlatNode): void {
        if (!node.isFile) {
            this.selectListSelection.toggle(node);
            return;
        }
        this.selectListSelection.toggle(node);
        this.selectedFile = node;
        this.zoomLevel = 1.0;
        this.rotation = 0;
        this.currentPage = 1;
        this.totalPages = 0;
        this.currentPdfDoc = null;
        this.officePreviewUrl = null;
        this.isLoadingPreview = true;

        const ext = (node.extension || '').toLowerCase();

        if (ext === 'pdf') {
            this.currentPdfUrl = this.getProxyUrl(node.url_file);
            this.currentPdfPwd = node.password_file;
            setTimeout(() => this.renderPdf(this.currentPdfUrl, this.currentPdfPwd), 50);
        } else if (this.isOffice(ext)) {
            // Assignation synchrone : null puis nouvelle URL dans le même cycle.
            // Angular ne voit que la valeur finale → met à jour [src] → le
            // navigateur recharge l'iframe. Pas de setTimeout = pas de race condition.
            this.startOfficeLoaderTimer();
            this.officePreviewUrl = this.getOfficePreviewUrl(node.url_file);
        } else {
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
        const url = this.getProxyUrl(this.selectedFile.url_file);
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
        const url = this.getProxyUrl(this.selectedFile.url_file);
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
    renderPdf(url: string, pwd: string): void {
        this.currentPage = 1;
        this.currentPdfDoc = null;
        const loadingTask = pdfjsLib.getDocument({url, password: pwd});
        loadingTask.promise
            .then((pdf: any) => {
                this.currentPdfDoc = pdf;
                this.totalPages = pdf.numPages;
                this.renderPage(this.currentPage);
            })
            .catch((err: any) => {
                this.isLoadingPreview = false;
                if (err.name === 'PasswordException') {
                    const pass = prompt('Ce PDF est protégé. Saisir le mot de passe :');
                    if (pass) this.renderPdf(url, pass);
                }
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

    getProxyUrl(url: string): string {
        return environment.production ? url : url.replace(`${environment.URL_API}`, '');
    }

    getFileExtension(url: string): string {
        return url ? (url.split('.').pop() || '') : '';
    }

    isImage(extension: string): boolean {
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'JPEG', 'PNG'].includes(extension);
    }

    isOffice(extension: string): boolean {
        return this.OFFICE_EXTENSIONS.includes((extension || '').toLowerCase());
    }
}
