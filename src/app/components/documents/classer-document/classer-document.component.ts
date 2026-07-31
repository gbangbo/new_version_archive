import {Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzSplitterModule} from 'ng-zorro-antd/splitter';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzTreeFlatDataSource, NzTreeFlattener, NzTreeViewModule} from 'ng-zorro-antd/tree-view';
import {Authorization} from '../../../protect/authorization.service';
import {environment} from '../../../../environments/environment';
import {HttpService} from '../../../core/http.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {DomSanitizer, SafeHtml, SafeResourceUrl} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as pdfjsLib from 'pdfjs-dist';
import {FeatherIconsComponent} from "../../icons/feather-icon/feather-icon.component";
import {HistoLogService} from "../../../shared/services/histo-log.service";

interface ClassifyNode {
    name: string;
    key?: string;
    uid?: string;
    extension?: string;
    url_file?: string;
    password_file?: string;
    isFile?: boolean;
    disabled?: boolean;
    children?: ClassifyNode[];
    date_modified?: string;
    file_size?: number;
}

interface FlatNode {
    expandable: boolean;
    name: string;
    key: string;
    uid: string;
    extension: string;
    url_file: string;
    password_file: string;
    isFile: boolean;
    level: number;
    disabled: boolean;
    fileCount: number;
}

@Component({
    selector: 'app-classer-document',
    imports: [CommonModule, FormsModule, NzTreeViewModule, NzIconModule, NzSplitterModule, NzDropDownModule, FeatherIconsComponent],
    templateUrl: './classer-document.component.html',
    styleUrl: './classer-document.component.scss',
})
export class ClasserDocumentComponent implements OnInit {

    @ViewChild('fileUploadInput') fileUploadInput!: ElementRef<HTMLInputElement>;

    sessionData: any = null;
    users: any = [];

    // États
    isloading = false;
    isSaving = false;
    isUploading = false;
    uploadCurrent = 0;
    uploadTotal = 0;
    searchQuery = '';
    viewMode: 'grid' | 'list' = 'list';

    // Données arbre
    private cleanTreeData: ClassifyNode[] = [];
    treeData: ClassifyNode[] = [];
    pieceFiles: any[] = [];
    fileAssignments = new Map<string, string>();

    // Drag & Drop
    draggedItemUid: string | null = null;
    dropTargetKey: string | null = null;
    dropTargetPanel: string | null = null; // uid du dossier dans le panel droit

    // Navigation file manager
    currentFolderUid: string | null = null;
    folderContents: ClassifyNode[] = [];
    selectedItem: ClassifyNode | null = null;
    breadcrumb: { name: string; uid: string | null }[] = [];

    sortBy: 'date' | 'name' | 'type' = 'name';

    // ── Prévisualisation ──────────────────────────────────────────
    showPreview = false;
    previewItem: ClassifyNode | null = null;
    isLoadingPreview = false;
    previewExt = '';
    previewUrl = '';
    previewOfficeUrl: SafeResourceUrl | null = null;
    zoomLevel = 1.0;
    rotation = 0;
    currentPage = 1;
    totalPages = 0;
    private readonly ZOOM_STEP = 0.25;
    private readonly ZOOM_MIN = 0.25;
    private readonly ZOOM_MAX = 4.0;
    private readonly OFFICE_EXTS = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
    private readonly IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    private currentPdfDoc: any = null;
    private officeTimer: any = null;

    // ── Arbre (panneau gauche) ─────────────────────────────────────
    private transformer = (node: ClassifyNode, level: number): FlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        key: node.key || node.uid || '',
        uid: node.uid || node.key || '',
        extension: node.extension || '',
        url_file: node.url_file || '',
        password_file: node.password_file || '',
        isFile: !!node.isFile,
        level,
        disabled: !!node.disabled,
        fileCount: node.children?.filter(c => c.isFile).length ?? 0,
    });

    selectListSelection = new SelectionModel<FlatNode>();

    treeControl = new FlatTreeControl<FlatNode>(
        n => n.level,
        n => n.expandable
    );

    treeFlattener = new NzTreeFlattener(
        this.transformer,
        n => n.level,
        n => n.expandable,
        n => n.children
    );

    dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private toast: ToastrService,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef,
        private histoLog: HistoLogService
    ) {
    }

    /* Nom d'un dossier du plan de classement par sa clé (recherche récursive) */
    private findFolderName(key: string, nodes: ClassifyNode[] = this.cleanTreeData): string {
        for (const n of nodes) {
            if ((n.key || n.uid) === key) return n.name || '';
            if (n.children?.length) {
                const found = this.findFolderName(key, n.children);
                if (found) return found;
            }
        }
        return '';
    }

    ngOnInit(): void {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
        this.users = this.autor.getInfosUsers();
        this.sessionData = this.autor.getInfosPreview();
        const uidTypeDoc = this.sessionData?.datatype_document?.[0]?.uid || '';
        this.showPieces(this.users.uid, this.sessionData?.uid);
        this.showCatOrder('', uidTypeDoc, '');
        this.treeControl.expansionModel.changed.subscribe(() =>
            setTimeout(() => this.cdr.detectChanges(), 0)
        );
    }

    hasChild = (_: number, n: FlatNode) => !n.isFile;

    // ── Chargement données ────────────────────────────────────────

    showCatOrder(idsociete = '', idtype_document = '', idcategories = '') {
        this.isloading = true;
        this.httService
            .getData(
                `${environment.api_url}api/:save-categorie-plan-classement?idsociete=${idsociete}&idtype_document=${idtype_document}&idcategories=${idcategories}`,
                false, this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    const raw: any[] = res.body.data || [];
                    const withChildren = raw.filter((d: any) => d.children?.length);
                    const dataToMap = withChildren.length > 0 ? withChildren : raw;
                    const mapped = this.mapApiToTree(dataToMap);
                    if (!mapped?.length) return;
                    this.cleanTreeData = JSON.parse(JSON.stringify(mapped));
                    this.rebuildTree();
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    showPieces(iduser = '', iddocuments = '') {
        this.httService
            .getData(
                `${environment.api_url}api/:consultation-pieces-documents?iduser=${iduser}&iddocuments=${iddocuments}`,
                false, this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                console.log("pieces ======", res.body.data)
                if (res.body.status || res.body.success) {
                    this.pieceFiles = res.body.data.map((d: any) => {
                        return {
                            ...d,
                            extension: d?.extension_file_docs.replace('.', '')
                        }
                    }) || [];
                    this.fileAssignments.clear();
                    if (this.cleanTreeData.length) this.rebuildTree();
                }
            })
            .catch(() => {
            });
    }

    private rebuildTree(): void {
        if (!this.cleanTreeData?.length) return;

        const grouped = new Map<string, ClassifyNode[]>();
        const unassigned: ClassifyNode[] = [];

        for (const file of this.pieceFiles) {
            const node = this.mapFileToNode(file);
            const folderKey = this.fileAssignments.get(file.uid) || file.datacats?.uid || null;
            if (folderKey) {
                if (!grouped.has(folderKey)) grouped.set(folderKey, []);
                grouped.get(folderKey)!.push(node);
            } else {
                unassigned.push(node);
            }
        }

        const tree = this.injectFiles(JSON.parse(JSON.stringify(this.cleanTreeData)), grouped);

        if (unassigned.length && tree.length) {
            const root = tree[0];
            root.children = [...(root.children || []).filter((n: any) => !n.isFile), ...unassigned];
        }

        this.treeData = tree;
        this.dataSource.setData([...tree]);
        setTimeout(() => this.treeControl.expandAll(), 100);
        this.refreshPanel();
        this.cdr.detectChanges();
    }

    private injectFiles(nodes: ClassifyNode[], grouped: Map<string, ClassifyNode[]>): ClassifyNode[] {
        return nodes.map(node => {
            const k = node.key || node.uid || '';
            const files = grouped.get(k) || [];
            if (node.children) {
                node.children = [...this.injectFiles(node.children, grouped), ...files];
            } else if (files.length) {
                node.children = [...files];
            }
            return node;
        });
    }

    // ── Navigation File Manager ───────────────────────────────────

    /** Appelé depuis le clic sur un nœud dossier dans l'arbre gauche */
    onTreeFolderClick(node: FlatNode): void {
        this.selectListSelection.clear();
        this.selectListSelection.select(node);
        this.selectedItem = null;
        this.navigateTo(node.uid || node.key, node.name);
    }

    /** Appelé depuis un double-clic sur un dossier dans le panneau droit */
    onPanelFolderDblClick(item: ClassifyNode): void {
        this.navigateTo(item.uid || item.key || null, item.name);
        // Synchroniser la sélection dans le tree
        const flatNode = this.treeControl.dataNodes?.find(n => n.uid === item.uid || n.key === item.uid);
        if (flatNode) {
            this.selectListSelection.clear();
            this.selectListSelection.select(flatNode);
        }
    }

    /** Clic simple sur un item du panneau droit */
    onPanelItemClick(item: ClassifyNode): void {
        if (this.selectedItem?.uid === item.uid) {
            this.selectedItem = null;
            this.closePreview();
        } else {
            this.selectedItem = item;
            if (item.isFile) this.openPreview(item);
        }
    }

    navigateTo(uid: string | null | undefined, name?: string): void {
        const resolvedUid = uid || null;
        this.currentFolderUid = resolvedUid;
        this.selectedItem = null;

        if (!resolvedUid) {
            this.breadcrumb = [];
        } else {
            const existing = this.breadcrumb.findIndex(b => b.uid === resolvedUid);
            if (existing >= 0) {
                this.breadcrumb = this.breadcrumb.slice(0, existing + 1);
            } else {
                this.breadcrumb = [...this.buildPathTo(this.treeData, resolvedUid) || []];
                if (!this.breadcrumb.length && name) {
                    this.breadcrumb = [{name, uid: resolvedUid}];
                }
            }
        }

        this.refreshPanel();
    }

    navigateBreadcrumb(index: number): void {
        const crumb = this.breadcrumb[index];
        this.breadcrumb = this.breadcrumb.slice(0, index + 1);
        this.currentFolderUid = crumb.uid;
        this.selectedItem = null;
        this.refreshPanel();
    }

    navigateRoot(): void {
        this.currentFolderUid = null;
        this.breadcrumb = [];
        this.selectedItem = null;
        this.selectListSelection.clear();
        this.refreshPanel();
    }

    private refreshPanel(): void {
        if (!this.currentFolderUid) {
            this.folderContents = [...this.treeData];
            return;
        }
        this.folderContents = this.findChildren(this.treeData, this.currentFolderUid) || [];
    }

    private findChildren(nodes: ClassifyNode[], uid: string): ClassifyNode[] | null {
        for (const n of nodes) {
            if ((n.uid === uid || n.key === uid) && !n.isFile) {
                return n.children || [];
            }
            if (n.children?.length) {
                const found = this.findChildren(n.children, uid);
                if (found !== null) return found;
            }
        }
        return null;
    }

    private buildPathTo(nodes: ClassifyNode[], uid: string, path: { name: string; uid: string | null }[] = []): { name: string; uid: string | null }[] | null {
        for (const n of nodes) {
            const nUid = n.uid || n.key || '';
            if (nUid === uid) return [...path, {name: n.name, uid: nUid}];
            if (n.children?.length) {
                const found = this.buildPathTo(n.children, uid, [...path, {name: n.name, uid: nUid}]);
                if (found) return found;
            }
        }
        return null;
    }

    get panelFolders(): ClassifyNode[] {
        const items = this.folderContents.filter(n => !n.isFile);
        return this.sortBy === 'name' ? [...items].sort((a, b) => a.name.localeCompare(b.name)) : items;
    }

    get panelFiles(): ClassifyNode[] {
        const items = this.folderContents.filter(n => n.isFile);
        return this.sortBy === 'name' ? [...items].sort((a, b) => a.name.localeCompare(b.name)) : items;
    }

    get isEmpty(): boolean {
        return !this.isloading && this.folderContents.length === 0;
    }

    get zoomPercent(): number {
        return Math.round(this.zoomLevel * 100);
    }

    get isPreviewImage(): boolean {
        return this.IMAGE_EXTS.includes(this.previewExt);
    }

    get isPreviewOffice(): boolean {
        return this.OFFICE_EXTS.includes(this.previewExt);
    }

    // ── Contrôles arbre ───────────────────────────────────────────

    expandAll(): void {
        this.treeControl.expandAll();
    }

    collapseAll(): void {
        this.treeControl.collapseAll();
    }

    onSearchChange(): void {
        const q = this.searchQuery.trim();
        if (!q) {
            setTimeout(() => this.treeControl.expandAll(), 50);
            return;
        }
        setTimeout(() => {
            const lower = q.toLowerCase();
            this.treeControl.dataNodes?.forEach(n => {
                if ((n.name || '').toLowerCase().includes(lower)) this.expandAncestors(n);
            });
        }, 50);
    }

    clearSearch(): void {
        this.searchQuery = '';
        setTimeout(() => this.treeControl.expandAll(), 50);
    }

    private expandAncestors(node: FlatNode): void {
        const nodes = this.treeControl.dataNodes;
        const idx = nodes.indexOf(node);
        if (idx < 0) return;
        let lv = node.level - 1;
        for (let i = idx - 1; i >= 0 && lv >= 0; i--) {
            if (nodes[i].level === lv) {
                this.treeControl.expand(nodes[i]);
                lv--;
            }
        }
    }

    highlightMatch(text: string, query: string): SafeHtml {
        if (!query.trim()) return this.sanitizer.bypassSecurityTrustHtml(this.escapeHtml(text));
        const esc = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return this.sanitizer.bypassSecurityTrustHtml(
            this.escapeHtml(text).replace(new RegExp(`(${esc})`, 'gi'), '<mark class="hl">$1</mark>')
        );
    }

    private escapeHtml(t: string): string {
        return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // ── Drag & Drop ───────────────────────────────────────────────

    /** Depuis le panneau droit (fichier) */
    onPanelFileDragStart(event: DragEvent, item: ClassifyNode): void {
        this.draggedItemUid = item.uid || item.key || null;
        event.dataTransfer!.effectAllowed = 'move';
        event.dataTransfer!.setData('text/plain', this.draggedItemUid || '');
    }

    /** Depuis le panneau gauche (fichier dans l'arbre) */
    onTreeFileDragStart(event: DragEvent, node: FlatNode): void {
        this.draggedItemUid = node.uid || node.key;
        event.dataTransfer!.effectAllowed = 'move';
        event.dataTransfer!.setData('text/plain', this.draggedItemUid || '');
    }

    onDragEnd(): void {
        this.draggedItemUid = null;
        this.dropTargetKey = null;
        this.dropTargetPanel = null;
    }

    /** Drop sur un dossier du panneau gauche (arbre) */
    onTreeFolderDragOver(event: DragEvent, folderKey: string): void {
        if (!this.draggedItemUid) return;
        event.preventDefault();
        event.dataTransfer!.dropEffect = 'move';
        this.dropTargetKey = folderKey;
    }

    onTreeFolderDragLeave(event: DragEvent): void {
        const t = event.currentTarget as HTMLElement;
        if (!t.contains(event.relatedTarget as HTMLElement)) this.dropTargetKey = null;
    }

    onTreeFolderDrop(event: DragEvent, folderKey: string): void {
        event.preventDefault();
        event.stopPropagation();
        if (!this.draggedItemUid || !folderKey) return;

        const uid = this.draggedItemUid;
        this.draggedItemUid = null;
        this.dropTargetKey = null;
        this.moveFileTo(uid, folderKey);
    }

    /** Drop sur un dossier du panneau droit */
    onPanelFolderDragOver(event: DragEvent, folderUid: string): void {
        if (!this.draggedItemUid) return;
        event.preventDefault();
        this.dropTargetPanel = folderUid;
    }

    onPanelFolderDragLeave(event: DragEvent): void {
        const t = event.currentTarget as HTMLElement;
        if (!t.contains(event.relatedTarget as HTMLElement)) this.dropTargetPanel = null;
    }

    onPanelFolderDrop(event: DragEvent, folderUid: string): void {
        event.preventDefault();
        event.stopPropagation();
        if (!this.draggedItemUid || !folderUid) return;

        const uid = this.draggedItemUid;
        this.draggedItemUid = null;
        this.dropTargetPanel = null;
        this.moveFileTo(uid, folderUid);
    }

    onRootDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (!this.draggedItemUid) return;
        const uid = this.draggedItemUid;
        this.draggedItemUid = null;
        this.dropTargetKey = null;
        this.moveFileTo(uid, '');
    }

    private moveFileTo(fileUid: string, folderKey: string): void {
        this.isSaving = true;
        this.httService
            .postData(
                `${environment.api_url}api/:save-plan-rangement-document`,
                {idpiece_docs: fileUid, idcategories: folderKey, idsociete: this.users?.datasociete?.uid},
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isSaving = false;
                if (res.body.status || res.body.success) {
                    if (folderKey) {
                        this.fileAssignments.set(fileUid, folderKey);
                        // Log d'action (classement dans un dossier)
                        const f = this.pieceFiles.find(p => p.uid === fileUid) || {};
                        const nameCategorie = this.sessionData?.datacategories?.name_categories
                            || this.sessionData?.datatype_document?.[0]?.libelle_type_docs || '';
                        const codePiece = f?.code_piece_docs || '';
                        const origneName = f?.origne_name || f?.name_piece_docs || '';
                        const extPiece = f?.extension_piece_docs || f?.extension_file_docs || (f?.extension ? '.' + f.extension : '');
                        const folderName = this.findFolderName(folderKey);
                        const actionLogs = `A classé le document (${nameCategorie}) numéro (${codePiece}) fichier (${origneName}${extPiece}) dans le dossier(${folderName})`;
                        this.histoLog.log(actionLogs, {idpiece_docs: fileUid});
                    } else {
                        this.fileAssignments.delete(fileUid);
                    }
                    this.rebuildTree();
                    this.toast.success('Fichier déplacé avec succès.', '', {
                        positionClass: 'toast-top-right',
                        closeButton: true,
                        timeOut: 3000
                    });
                } else {
                    this.toast.error(res.body.message || 'Erreur.', '', {
                        positionClass: 'toast-top-right',
                        closeButton: true,
                        timeOut: 4000
                    });
                }
            })
            .catch(() => {
                this.isSaving = false;
                this.toast.error('Erreur lors du déplacement.', '', {
                    positionClass: 'toast-top-right',
                    closeButton: true,
                    timeOut: 4000
                });
            });
    }

    // ── Actions fichier ───────────────────────────────────────────

    openInNewTab(): void {
        if (!this.selectedItem?.url_file) return;
        window.open(this.getProxyUrl(this.selectedItem.url_file), '_blank');
    }

    async downloadFile(): Promise<void> {
        if (!this.selectedItem?.url_file) return;
        const url = this.getProxyUrl(this.selectedItem.url_file);
        const filename = `${this.selectedItem.name}.${this.selectedItem.extension}`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error();
            const blob = await res.blob();
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

    async deleteFile(): Promise<void> {
        if (!this.selectedItem?.isFile) return;

        const result = await Swal.fire({
            html: `<div style="margin-top:8px">
                     <p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px">Supprimer ce fichier ?</p>
                     <p style="font-size:13px;color:#64748B;margin:0">
                       <strong>${this.selectedItem.name}.${this.selectedItem.extension}</strong> sera définitivement supprimé.
                     </p>
                   </div>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        const uid = this.selectedItem.uid!;
        this.isSaving = true;

        this.httService
            .postData(
                `${environment.api_url}api/:supprimer-pieces-documents`,
                {idpiece_docs: uid, iddocuments: this.sessionData?.uid},
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isSaving = false;
                if (res.body.status || res.body.success) {
                    this.pieceFiles = this.pieceFiles.filter(f => f.uid !== uid);
                    this.fileAssignments.delete(uid);
                    this.selectedItem = null;
                    this.rebuildTree();
                    this.toast.success('Fichier supprimé.', '', {
                        positionClass: 'toast-top-right',
                        closeButton: true,
                        timeOut: 3000
                    });
                } else {
                    this.toast.error(res.body.message || 'Erreur.', '', {
                        positionClass: 'toast-top-right',
                        closeButton: true,
                        timeOut: 4000
                    });
                }
            })
            .catch(() => {
                this.isSaving = false;
                this.toast.error('Erreur lors de la suppression.', '', {
                    positionClass: 'toast-top-right',
                    closeButton: true,
                    timeOut: 4000
                });
            });
    }

    triggerUpload(): void {
        this.fileUploadInput.nativeElement.click();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const files = Array.from(input.files || []);
        input.value = '';
        if (!files.length) return;
        this.uploadFilesSequentially(files);
    }

    private async uploadFilesSequentially(files: File[]): Promise<void> {
        this.uploadTotal = files.length;
        this.uploadCurrent = 0;
        this.isUploading = true;
        let successCount = 0;

        for (const file of files) {
            this.uploadCurrent++;
            this.cdr.detectChanges();

            const formData = new FormData();
            formData.append('action', '1');
            formData.append('idsociete', this.users?.datasociete?.uid ?? '');
            formData.append('idfile', '');
            formData.append('iduser_file', this.users?.uid ?? '');
            formData.append('statut_ocr', '1');
            formData.append('idcategorie', this.currentFolderUid ?? '');
            formData.append('iddocument', this.sessionData?.uid ?? '');
            formData.append('lib_file', file);

            try {
                const res: any = await this.httService
                    .postDataMultipart(
                        `${environment.api_url}api/:save-upload-file-documents`,
                        formData,
                        this.users?.access_token || ''
                    )
                    .toPromise();
                if (res.body.status || res.body.success) {
                    successCount++;
                } else {
                    this.toast.error(`${file.name} : ${res.body.message || 'Erreur'}`, '', {
                        positionClass: 'toast-top-right', closeButton: true, timeOut: 4000
                    });
                }
            } catch {
                this.toast.error(`Erreur lors du téléversement de « ${file.name} »`, '', {
                    positionClass: 'toast-top-right', closeButton: true, timeOut: 4000
                });
            }
        }

        this.isUploading = false;
        this.uploadCurrent = 0;
        this.uploadTotal = 0;

        if (successCount > 0) {
            this.showPieces(this.users.uid, this.sessionData?.uid);
            const msg = files.length === 1
                ? 'Fichier téléversé avec succès.'
                : `${successCount} / ${files.length} fichier(s) téléversé(s) avec succès.`;
            this.toast.success(msg, '', {
                positionClass: 'toast-top-right', closeButton: true, timeOut: 3000
            });
        }
    }

    // ── Helpers ───────────────────────────────────────────────────

    getProxyUrl(url: string): string {
        return environment.production ? url : url.replace(`${environment.URL_API}`, '');
    }

    private mapApiToTree(data: any[]): ClassifyNode[] {
        return data.map(item => ({
            name: item?.name_categories,
            key: item?.uid, uid: item?.uid,
            disabled: false,
            children: item.children?.length > 0 ? this.mapApiToTree(item.children) : undefined,
        }));
    }

    private mapFileToNode(d: any): ClassifyNode {

        return {
            name: d.name_piece_docs || d.name_file_docs || d.name || d.name_piece_docs || '',
            key: d.uid, uid: d.uid,
            url_file: d.url_file || '',
            extension: d.extension, //this.getFileExtension(d.url_file || ''),
            password_file: d.password_file || '',
            isFile: true, disabled: false, children: undefined,
            date_modified: d.date_modified || d.updated_at || d.created_at || '',
            file_size: d.file_size || d.size || 0,
        };
    }

    getFileExtension(url: string): string {
        return url ? (url.split('.').pop() || '').toLowerCase() : '';
    }

    getFileIconClass(ext: string): string {

        const e = (ext || '').toLowerCase();
        if (e === 'pdf') return 'fa-file-pdf';
        if (['doc', 'docx'].includes(e)) return 'fa-file-word';
        if (['xls', 'xlsx'].includes(e)) return 'fa-file-excel';
        if (['ppt', 'pptx'].includes(e)) return 'fa-file-powerpoint';
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'].includes(e)) return 'fa-file-image';
        if (['zip', 'rar', '7z', 'tar'].includes(e)) return 'fa-file-archive';
        if (['mp4', 'avi', 'mov', 'mkv'].includes(e)) return 'fa-file-video';
        if (['mp3', 'wav', 'aac'].includes(e)) return 'fa-file-audio';
        return 'fa-file';
    }

    getFileIconColor(ext: string): string {
        const colorMap: Record<string, string> = {
            'fa-file-pdf': '#E53E3E', 'fa-file-word': '#3182CE',
            'fa-file-excel': '#276749', 'fa-file-powerpoint': '#DD6B20',
            'fa-file-image': '#805AD5', 'fa-file-archive': '#718096',
            'fa-file-video': '#00B5D8', 'fa-file-audio': '#D69E2E', 'fa-file': '#4A5568',
        };
        return colorMap[this.getFileIconClass(ext)] || '#4A5568';
    }

    getFileExtLabel(ext: string): string {
        const e = (ext || '').toLowerCase();
        const labels: Record<string, string> = {
            pdf: 'Document PDF', doc: 'Document Word', docx: 'Document Word',
            xls: 'Feuille Excel', xlsx: 'Feuille Excel', ppt: 'Présentation', pptx: 'Présentation',
            jpg: 'Image JPEG', jpeg: 'Image JPEG', png: 'Image PNG', gif: 'Image GIF',
            bmp: 'Image BMP', svg: 'Image SVG', webp: 'Image WebP',
            zip: 'Archive ZIP', rar: 'Archive RAR', '7z': 'Archive 7-Zip',
            mp4: 'Vidéo MP4', avi: 'Vidéo AVI', mov: 'Vidéo MOV', mp3: 'Audio MP3', wav: 'Audio WAV',
        };
        return labels[e] || (e ? e.toUpperCase() : 'Fichier');
    }

    navigateUp(): void {
        if (!this.currentFolderUid) return;
        if (this.breadcrumb.length <= 1) {
            this.navigateRoot();
        } else {
            this.navigateBreadcrumb(this.breadcrumb.length - 2);
        }
    }

    refreshAll(): void {
        const uidTypeDoc = this.sessionData?.datatype_document?.[0]?.uid || '';
        this.showPieces(this.users.uid, this.sessionData?.uid);
        this.showCatOrder('', uidTypeDoc, '');
    }

    formatFileSize(bytes?: number): string {
        if (!bytes) return '';
        if (bytes < 1024) return `${bytes} o`;
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} Ko`;
        return `${(bytes / 1048576).toFixed(1)} Mo`;
    }

    get fileCount(): number {
        return this.pieceFiles.length;
    }

    get folderCount(): number {
        return this.treeControl.dataNodes?.filter(n => n.expandable).length || 0;
    }

    setSortBy(sort: 'date' | 'name' | 'type'): void {
        this.sortBy = sort;
    }


    @HostListener('document:keydown.escape')
    onEscape(): void {
        if (this.showPreview) this.closePreview();
    }

    // ── Prévisualisation ──────────────────────────────────────────

    openPreview(item: ClassifyNode | null): void {

        if (!item?.isFile) return;
        this.previewItem = item;
        this.showPreview = true;
        this.isLoadingPreview = true;
        this.zoomLevel = 1.0;
        this.rotation = 0;
        this.currentPage = 1;
        this.totalPages = 0;
        this.currentPdfDoc = null;
        this.previewOfficeUrl = null;
        const url:any = item.url_file ;//this.getProxyUrl(item.url_file || '');
        this.previewUrl = url;
        this.previewExt = item.extension || '';
        if (this.previewExt === 'pdf') {
            setTimeout(() => this.renderPdf(url), 80);
        } else if (this.isPreviewOffice) {
            this.startOfficeTimer();
            this.previewOfficeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
            );
        } else {
            this.isLoadingPreview = false;
        }
    }

    closePreview(): void {
        this.showPreview = false;
        this.previewItem = null;
        this.currentPdfDoc = null;
        if (this.officeTimer) {
            clearTimeout(this.officeTimer);
            this.officeTimer = null;
        }
    }

    onPreviewLoaded(): void {
        setTimeout(() => {
            this.isLoadingPreview = false;
            this.cdr.detectChanges();
        }, 0);
    }

    onOfficeLoaded(): void {
        if (this.officeTimer) {
            clearTimeout(this.officeTimer);
            this.officeTimer = null;
        }
        this.isLoadingPreview = false;
    }

    private startOfficeTimer(): void {
        if (this.officeTimer) clearTimeout(this.officeTimer);
        this.officeTimer = setTimeout(() => {
            this.isLoadingPreview = false;
            this.officeTimer = null;
        }, 12_000);
    }

    zoomIn(): void {
        this.zoomLevel = Math.min(this.ZOOM_MAX, +(this.zoomLevel + this.ZOOM_STEP).toFixed(2));
        this.applyZoom();
    }

    zoomOut(): void {
        this.zoomLevel = Math.max(this.ZOOM_MIN, +(this.zoomLevel - this.ZOOM_STEP).toFixed(2));
        this.applyZoom();
    }

    resetZoom(): void {
        this.zoomLevel = 1.0;
        this.applyZoom();
    }

    private applyZoom(): void {
        if (this.previewExt === 'pdf') {
            this.isLoadingPreview = true;
            setTimeout(() => this.renderPage(this.currentPage), 50);
        }
    }

    rotateLeft(): void {
        this.rotation = (this.rotation - 90 + 360) % 360;
        if (this.previewExt === 'pdf') {
            this.isLoadingPreview = true;
            setTimeout(() => this.renderPage(this.currentPage), 50);
        }
    }

    rotateRight(): void {
        this.rotation = (this.rotation + 90) % 360;
        if (this.previewExt === 'pdf') {
            this.isLoadingPreview = true;
            setTimeout(() => this.renderPage(this.currentPage), 50);
        }
    }

    prevPage(): void {
        if (this.currentPage <= 1) return;
        this.currentPage--;
        this.isLoadingPreview = true;
        setTimeout(() => this.renderPage(this.currentPage), 50);
    }

    nextPage(): void {
        if (this.currentPage >= this.totalPages) return;
        this.currentPage++;
        this.isLoadingPreview = true;
        setTimeout(() => this.renderPage(this.currentPage), 50);
    }

    goToPage(value: string): void {
        const p = Math.max(1, Math.min(this.totalPages, parseInt(value, 10) || 1));
        if (p === this.currentPage) return;
        this.currentPage = p;
        this.isLoadingPreview = true;
        setTimeout(() => this.renderPage(this.currentPage), 50);
    }

    private renderPdf(url: string): void {
        this.currentPage = 1;
        this.currentPdfDoc = null;
        const password = this.previewItem?.password_file || undefined;
        pdfjsLib.getDocument({url, password}).promise.then((pdf: any) => {
            this.currentPdfDoc = pdf;
            this.totalPages = pdf.numPages;
            this.renderPage(1);
        }).catch(() => {
            this.isLoadingPreview = false;
        });
    }

    private renderPage(pageNum: number): void {
        if (!this.currentPdfDoc) return;
        this.currentPdfDoc.getPage(pageNum).then((page: any) => {
            const canvas = document.getElementById('cd-pdf-canvas') as HTMLCanvasElement;
            if (!canvas) return;
            const viewport = page.getViewport({scale: this.zoomLevel * 1.5, rotation: this.rotation});
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            page.render({canvasContext: canvas.getContext('2d')!, viewport}).promise.then(() => {
                setTimeout(() => {
                    this.isLoadingPreview = false;
                    this.cdr.detectChanges();
                }, 0);
            });
        });
    }

    async downloadPreview(): Promise<void> {
        if (!this.previewUrl || !this.previewItem) return;
        const ext = this.previewExt ? `.${this.previewExt}` : '';
        const name = this.previewItem.name ?? 'fichier';
        const filename = name.includes('.') ? name : `${name}${ext}`;
        try {
            const res = await fetch(this.previewUrl);
            const blob = await res.blob();
            const bUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = bUrl;
            a.download = filename;
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(bUrl), 2000);
        } catch {
            window.open(this.previewUrl, '_blank');
        }
    }

    async printPreview(): Promise<void> {
        if (!this.previewUrl) return;
        if (this.previewExt === 'pdf' && this.currentPdfDoc) {
            const urls: string[] = [];
            for (let i = 1; i <= this.totalPages; i++) {
                const page = await this.currentPdfDoc.getPage(i);
                const cv = document.createElement('canvas');
                const vp = page.getViewport({scale: 2, rotation: 0});
                cv.width = vp.width;
                cv.height = vp.height;
                await page.render({canvasContext: cv.getContext('2d')!, viewport: vp}).promise;
                urls.push(cv.toDataURL('image/png'));
            }
            const w = window.open('', '_blank')!;
            w.document.write(`<html><head><style>*{margin:0}.p{page-break-after:always}img{width:100%}@page{margin:8mm}</style></head><body>
                ${urls.map(u => `<div class="p"><img src="${u}"/></div>`).join('')}</body></html>`);
            w.document.close();
            w.onload = () => {
                w.focus();
                w.print();
                w.onafterprint = () => w.close();
            };
        } else if (this.isPreviewImage) {
            const w = window.open('', '_blank')!;
            w.document.write(`<html><body style="margin:0"><img src="${this.previewUrl}" style="max-width:100%" onload="window.print();window.close()"/></body></html>`);
            w.document.close();
        }
    }
}
