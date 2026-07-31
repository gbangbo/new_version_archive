import {ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {FeatherIconComponent} from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import {AddModalComponent} from "./add-modal/add-modal.component";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import * as pdfjsLib from 'pdfjs-dist';
import moment from "moment";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

// ── Nœud du plan de classement (sidebar) ──────────────────
interface PlanNode {
    id: number;
    uid: string;
    name_categories: string;
    level: number;
    expanded: boolean;
    fileCount: number;   // total fichiers (directs + sous-dossiers)
    children: PlanNode[];
}

// ── Élément affiché dans la zone de contenu ───────────────
interface ContentItem {
    type: 'folder' | 'file';
    id?: number;       // id numérique pour les appels API
    uid: string;
    name: string;
    date: string;
    url_file?: string;
    // folder only
    childCount?: number;
    pieceCount?: number;
    // file only
    piece_jointe?: string;

    [key: string]: any;
}

@Component({
    selector: 'app-mes-doc',
    imports: [
        CommonModule,
        FormsModule,
        NzTooltipDirective,
        NzIconModule,
        NzTagModule,
        NzDropDownModule,
        FeatherIconComponent,
        AddModalComponent,
    ],
    templateUrl: './mes-doc.component.html',
    styleUrl: './mes-doc.component.scss',
})
export class MesDocComponent implements OnInit {

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    private users: any = {};
    isloading = false;
    isloadingTree = false;
    searchValue = '';

    viewMode: 'grid' | 'list' = 'grid';
    sortBy: 'date' | 'name' | 'type' = 'date';
    selectedRow: any = null;

    // ── Arbre sidebar ─────────────────────────────────────
    planTree: PlanNode[] = [];
    selectedNode: PlanNode | null = null;
    breadcrumbPath: PlanNode[] = []; // chemin complet du nœud courant (sans la racine)

    get rootNode(): PlanNode | null {
        return this.planTree[0] ?? null;
    }

    get sidebarFolders(): PlanNode[] {
        return this.rootNode?.children ?? [];
    }

    // ── Contenu zone principale ───────────────────────────
    // Arbre brut retourné une seule fois par l'API
    private rawContentTree: any[] = [];
    // Éléments (dossiers + fichiers) du nœud courant
    contentItems: ContentItem[] = [];

    // ── Nouveau dossier ───────────────────────────────────
    showNewFolderModal = false;
    newFolderName = '';
    savingFolder = false;

    // ── Importer fichier ──────────────────────────────────
    importingFile = false;
    importFileName = '';
    importCurrent = 0;
    importTotal = 0;

    // ── Déplacer un fichier (modal) ───────────────────────
    showMoveModal = false;
    movingItem: ContentItem | null = null;
    moveTargetNode: PlanNode | null = null;
    movingInProgress = false;
    moveModalFolders: { node: PlanNode; depth: number }[] = [];

    // ── Drag & drop ───────────────────────────────────────
    draggedItem: ContentItem | null = null;
    dragOverUid: string | null = null;

    // ── Menu contextuel dossier (clic droit) ──────────────
    ctxMenu: { visible: boolean; x: number; y: number; node: PlanNode | null } =
        {visible: false, x: 0, y: 0, node: null};
    ctxDeleteConfirm = false;

    // ── Renommer dossier ──────────────────────────────────
    showRenameModal = false;
    renamingNode: PlanNode | null = null;
    renameValue = '';
    renamingInProgress = false;

    // ── Prévisualisation ──────────────────────────────────
    showPreview = false;
    previewFile: ContentItem | null = null;
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

    get zoomPercent(): number {
        return Math.round(this.zoomLevel * 100);
    }

    get isPreviewImage(): boolean {
        return this.IMAGE_EXTS.includes(this.previewExt);
    }

    get isPreviewOffice(): boolean {
        return this.OFFICE_EXTS.includes(this.previewExt);
    }

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef,
        private toast: ToastrService,
    ) {
    }

    ngOnInit(): void {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdfjs/pdf.worker.mjs';
        this.users = this.autor.getInfosUsers();
        this.showPlanClassementPerso(
            this.users?.datasociete?.uid,
            this.users?.datapersonnel?.uid,
            ''
        );
    }

    // ── Données calculées ─────────────────────────────────
    get displayContent(): ContentItem[] {
        const val = this.searchValue.trim().toLowerCase();
        let data = val
            ? this.contentItems.filter(item => item.name.toLowerCase().includes(val))
            : this.contentItems;

        if (this.sortBy === 'name') {
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        }
        if (this.sortBy === 'type') {
            return [...data].sort((a, b) => {
                if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
                return a.name.localeCompare(b.name);
            });
        }
        // 'date' : dossiers d'abord, puis fichiers par ordre API
        return [...data].sort((a, b) => {
            if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
            return 0;
        });
    }

    get breadcrumbLabel(): string {
        const last = this.breadcrumbPath[this.breadcrumbPath.length - 1];
        return last?.name_categories ?? this.rootNode?.name_categories ?? 'Mes Documents';
    }

    get isRootSelected(): boolean {
        return this.selectedNode === null;
    }

    get totalCount(): number {
        return this.contentItems.length;
    }

    // ── Navigation dossiers (sidebar) ─────────────────────
    selectAllFolders(): void {
        this.selectedNode = null;
        this.breadcrumbPath = [];
        this.searchValue = '';
        this.updateContentItems();
    }

    selectFolderNode(node: PlanNode, event?: Event): void {
        event?.stopPropagation();
        this.selectedNode = node;
        this.buildBreadcrumb(node.uid);
        this.searchValue = '';
        this.updateContentItems();
    }

    toggleNode(node: PlanNode, event: Event): void {
        event.stopPropagation();
        node.expanded = !node.expanded;
    }

    // ── Navigation dossiers (zone de contenu) ─────────────
    navigateIntoFolder(item: ContentItem): void {
        const planNode = this.findPlanNodeByUid(this.planTree, item.uid);
        if (planNode) {
            this.selectedNode = planNode;
            this.buildBreadcrumb(planNode.uid);
        } else {
            const tempNode: PlanNode = {
                id: 0, uid: item.uid,
                name_categories: item.name,
                level: (this.selectedNode?.level ?? 0) + 1,
                expanded: false, fileCount: 0, children: [],
            };
            this.selectedNode = tempNode;
            this.breadcrumbPath = [...this.breadcrumbPath, tempNode];
        }
        this.searchValue = '';
        this.updateContentItems();
    }

    // ── Navigation breadcrumb (clic sur étape intermédiaire) ─
    navigateToBreadcrumb(node: PlanNode, index: number): void {
        this.selectedNode = node;
        this.breadcrumbPath = this.breadcrumbPath.slice(0, index + 1);
        this.searchValue = '';
        this.updateContentItems();
    }

    // ── Mise à jour de la zone de contenu ─────────────────
    private updateContentItems(): void {
        const targetUid = this.selectedNode?.uid ?? null;
        const targetRaw = targetUid
            ? this.findRawNodeByUid(this.rawContentTree, targetUid)
            : this.rawContentTree[0] ?? null;

        if (targetRaw) {
            this.parseContentItems(targetRaw);
        } else {
            this.contentItems = [];
        }
    }

    private parseContentItems(node: any): void {
        const folders: ContentItem[] = (node.children || []).map((child: any) => ({
            type: 'folder' as const,
            uid: child.uid,
            name: child.name_categories,
            date: moment(child.created_at).format('DD/MM/YYYY'),
            childCount: child.children?.length ?? 0,
            pieceCount: child.datapieces?.length ?? 0,
        }));

        const files: ContentItem[] = (node.datapieces || []).map((piece: any) => ({
            type: 'file' as const,
            id: piece.id,
            uid: piece.uid,
            name: piece.nom_fichiers,
            date: moment(piece.created_at).format('DD/MM/YYYY'),
            url_file: piece.piece_jointe,
            piece_jointe: piece.piece_jointe,
        }));

        this.contentItems = [...folders, ...files];
    }

    // ── Helpers arbre à plat ──────────────────────────────
    private flattenNodes(nodes: PlanNode[], depth: number): { node: PlanNode; depth: number }[] {
        const result: { node: PlanNode; depth: number }[] = [];
        for (const node of nodes) {
            result.push({node, depth});
            if (node.children.length > 0) {
                result.push(...this.flattenNodes(node.children, depth + 1));
            }
        }
        return result;
    }

    trackByNodeUid(_: number, item: { node: PlanNode; depth: number }): string {
        return item.node.uid;
    }

    // ── Modal déplacer ────────────────────────────────────
    openMoveModal(item: ContentItem): void {
        if (!item || item.type !== 'file') return;
        this.movingItem = item;
        this.moveTargetNode = null;
        // Pré-calculer une seule fois pour éviter la re-création dans le template
        this.moveModalFolders = this.flattenNodes(this.planTree, 0);
        this.showMoveModal = true;
    }

    closeMoveModal(): void {
        this.showMoveModal = false;
        this.movingItem = null;
        this.moveTargetNode = null;
    }

    selectMoveTarget(node: PlanNode, event: Event): void {
        event.stopPropagation();
        this.moveTargetNode = node;
    }

    confirmMove(): void {
        if (!this.movingItem?.id || !this.moveTargetNode?.id) return;
        this.movingInProgress = true;
        this.doMoveFile(this.movingItem.uid, this.moveTargetNode.uid, () => {
            this.movingInProgress = false;
            this.closeMoveModal();
        }, () => {
            this.movingInProgress = false;
        });
    }

    // ── Drag & drop ───────────────────────────────────────
    onDragStart(event: DragEvent, item: ContentItem): void {
        if (item.type !== 'file') {
            event.preventDefault();
            return;
        }
        this.draggedItem = item;
        event.dataTransfer!.effectAllowed = 'move';
        event.dataTransfer!.setData('text/plain', item.uid);
    }

    onDragEnd(): void {
        this.draggedItem = null;
        this.dragOverUid = null;
    }

    onDragOver(event: DragEvent, targetUid: string): void {
        if (!this.draggedItem || this.draggedItem.uid === targetUid) return;
        event.preventDefault();
        event.dataTransfer!.dropEffect = 'move';
        this.dragOverUid = targetUid;
    }

    onDragLeave(): void {
        this.dragOverUid = null;
    }

    // Drop sur un dossier de la SIDEBAR (PlanNode direct)
    onDropOnFolder(event: DragEvent, planNode: PlanNode): void {
        event.preventDefault();
        this.dragOverUid = null;
        if (!this.draggedItem?.id || !planNode.id) return;
        const fileId = this.draggedItem.uid;
        const dragged = this.draggedItem;
        this.draggedItem = null;
        this.doMoveFile(fileId, planNode.uid, () => this.refreshData(), () => {
            this.draggedItem = dragged;
        });
    }

    // Drop sur un dossier de la GRILLE (ContentItem → on cherche le PlanNode)
    onDropOnContentFolder(event: DragEvent, item: ContentItem): void {
        event.preventDefault();
        this.dragOverUid = null;
        if (!this.draggedItem?.id || item.type !== 'folder') return;
        const planNode = this.findPlanNodeByUid(this.planTree, item.uid);
        if (!planNode?.id) return;

        const fileId = this.draggedItem.uid;
        const dragged = this.draggedItem;
        this.draggedItem = null;
        this.doMoveFile(fileId, planNode.uid, () => this.refreshData(), () => {
            this.draggedItem = dragged;
        });
    }

    // ── Appel API commun ──────────────────────────────────
    private doMoveFile(fileId: string, folderId: string, onSuccess: () => void, onError: () => void): void {
        const payload = {
            idsociete: this.users?.datasociete?.uid,
            idcategorie_personnel: folderId,
            idpiece_jointe: fileId,
        };
        console.log('payload ===', payload)
        this.httService.postData(
            `${environment.api_url}auth/:save-rangement-fichier-personnel-plan-classement`,
            payload,
            this.users?.access_token || ''
        ).toPromise().then(onSuccess).catch(onError);
    }

    // ── Recherche ─────────────────────────────────────────
    onSearch(value: string): void {
        // Le filtrage est fait dans displayContent (getter)
    }

    selectRow(row: any): void {
        this.selectedRow = row;
    }

    setSortBy(sort: 'date' | 'name' | 'type'): void {
        this.sortBy = sort;
    }

    refreshData(): void {
        this.showRepertoireFile(
            this.users?.datasociete?.uid,
            this.users?.datapersonnel?.uid,
            ''
        );
    }

    // ── API : plan de classement (sidebar) ────────────────
    showPlanClassementPerso(idsociete = '', idpersonnel = '', idcategorie_personnel = '') {
        this.isloadingTree = true;
        this.httService.getData(
            `${environment.api_url}auth/:save-categorie-plan-classement-personnel?idsociete=${idsociete}&idpersonnel=${idpersonnel}&idcategorie_personnel=${idcategorie_personnel}`,
            false,
            this.users?.access_token || ''
        ).toPromise().then((res: any) => {
            this.isloadingTree = false;
            console.log("save-categorie-plan-classement-personnel ==", res.body)
            if (res.body.status || res.body.success) {
                this.planTree = this.mapPlanNodes(res.body.data || []);
                console.log("planTree ==", this.planTree)
                if (this.rootNode) this.rootNode.expanded = true;
            }
            // Charger l'arbre des fichiers
            this.showRepertoireFile(idsociete, idpersonnel, '');
        }).catch(() => {
            this.isloadingTree = false;
            this.showRepertoireFile(idsociete, idpersonnel, '');
        });
    }

    private mapPlanNodes(nodes: any[]): PlanNode[] {
        return (nodes || []).map(n => ({
            id: n.id,
            uid: n.uid,
            uid_personnel: n.uid_personnel,
            name_categories: n.name_categories,
            level: n.level,
            expanded: false,
            fileCount: 0,
            children: this.mapPlanNodes(n.children || []),
        }));
    }

    // ── API : fichiers (chargement unique) ────────────────
    showRepertoireFile(idsociete = '', idpersonnel = '', idcategorie_personnel = '') {
        this.isloading = true;
        this.contentItems = [];
        this.httService.getData(
            `${environment.api_url}auth/:save-rangement-fichier-personnel-plan-classement?idsociete=${idsociete}&idpersonnel=${idpersonnel}&idcategorie_personnel=${idcategorie_personnel}`,
            false,
            this.users?.access_token || ''
        ).toPromise().then((res: any) => {
            this.isloading = false;
            console.log("res.body.data  ===file ", res.body.data)
            if (res.body.status || res.body.success) {
                this.rawContentTree = res.body.data || [];
                this.syncFileCounts(this.rawContentTree);
                this.updateContentItems();
            }
        }).catch(() => {
            this.isloading = false;
        });
    }

    // ── Compteurs fichiers ────────────────────────────────

    // Nombre de fichiers directement dans la racine
    get totalFileCount(): number {
        return this.rawContentTree[0]?.datapieces?.length ?? 0;
    }

    // Parcourt rawContentTree et affecte le nombre de fichiers DIRECTS à chaque PlanNode
    private syncFileCounts(rawNodes: any[]): void {
        for (const raw of rawNodes) {
            const planNode = this.findPlanNodeByUid(this.planTree, raw.uid);
            if (planNode) {
                planNode.fileCount = raw.datapieces?.length ?? 0;
            }
            if (raw.children?.length) {
                this.syncFileCounts(raw.children);
            }
        }
    }

    // ── Helpers arbre ─────────────────────────────────────

    // Construit breadcrumbPath = chemin de la racine jusqu'au nœud ciblé (sans la racine)
    private buildBreadcrumb(targetUid: string): void {
        const path = this.findPathToNode(this.planTree, targetUid, []);
        // On exclut le nœud racine (level 0) car il est toujours affiché séparément
        this.breadcrumbPath = path ? path.filter(n => n.level > 0) : [];
    }

    private findPathToNode(nodes: PlanNode[], targetUid: string, current: PlanNode[]): PlanNode[] | null {
        for (const node of nodes) {
            const path = [...current, node];
            if (node.uid === targetUid) return path;
            if (node.children.length > 0) {
                const found = this.findPathToNode(node.children, targetUid, path);
                if (found) return found;
            }
        }
        return null;
    }

    private findPlanNodeByUid(nodes: PlanNode[], uid: string): PlanNode | null {
        for (const node of nodes) {
            if (node.uid === uid) return node;
            const found = this.findPlanNodeByUid(node.children, uid);
            if (found) return found;
        }
        return null;
    }

    private findRawNodeByUid(nodes: any[], uid: string): any {
        for (const node of nodes) {
            if (node.uid === uid) return node;
            if (node.children?.length) {
                const found = this.findRawNodeByUid(node.children, uid);
                if (found) return found;
            }
        }
        return null;
    }

    // ── Menu contextuel dossier ───────────────────────────
    @HostListener('document:click')
    onDocumentClick(): void {
        if (this.ctxMenu.visible) this.closeCtxMenu();
    }

    @HostListener('document:keydown.escape')
    onEscape(): void {
        this.closeCtxMenu();
        if (this.showRenameModal) this.closeRenameModal();
    }

    onFolderRightClick(event: MouseEvent, node: PlanNode): void {
        event.preventDefault();
        event.stopPropagation();
        this.ctxDeleteConfirm = false;
        this.ctxMenu = {visible: true, x: event.clientX, y: event.clientY, node};
    }

    onContentFolderRightClick(event: MouseEvent, item: ContentItem): void {
        event.preventDefault();
        event.stopPropagation();
        const planNode = this.findPlanNodeByUid(this.planTree, item.uid);
        if (!planNode) return;
        this.ctxDeleteConfirm = false;
        this.ctxMenu = {visible: true, x: event.clientX, y: event.clientY, node: planNode};
    }

    closeCtxMenu(): void {
        this.ctxMenu.visible = false;
        this.ctxDeleteConfirm = false;
    }

    // ── Renommer ──────────────────────────────────────────
    openRenameModal(): void {
        if (!this.ctxMenu.node) return;
        this.renamingNode = this.ctxMenu.node;
        this.renameValue = this.renamingNode.name_categories;
        this.closeCtxMenu();
        this.showRenameModal = true;
    }

    closeRenameModal(): void {
        this.showRenameModal = false;
        this.renamingNode = null;
        this.renameValue = '';
    }

    confirmRename(): void {
        const name = this.renameValue.trim();
        if (!this.renamingNode || !name) return;
        this.renamingInProgress = true;

        const path = this.findPathToNode(this.planTree, this.renamingNode.uid, []);
        const parentNode = path && path.length > 1 ? path[path.length - 2] : null;

        const payload = {
            action: 2,
            idcategorie_personnel: this.renamingNode.uid,
            idsociete: this.users?.datasociete?.uid,
            idpersonnel: this.users?.datapersonnel?.uid,
            name_categories: name,
            position: 1,
            actif: true,
            parent: parentNode?.uid ?? '',
        };
        console.log("this.renamingNode ===", this.renamingNode)

        this.httService.postData(
            `${environment.api_url}auth/:save-categorie-plan-classement-personnel`,
            payload,
            this.users?.access_token || ''
        ).toPromise().then(() => {
            this.renamingInProgress = false;
            this.closeRenameModal();
            this.showPlanClassementPerso(
                this.users?.datasociete?.uid,
                this.users?.datapersonnel?.uid, ''
            );
        }).catch(() => {
            this.renamingInProgress = false;
        });
    }

    // ── Supprimer dossier ─────────────────────────────────
    requestDeleteFolder(): void {
        this.ctxDeleteConfirm = true;
    }

    confirmDeleteFolder(): void {
        const node = this.ctxMenu.node;
        if (!node) return;
        this.closeCtxMenu();
        const payload = {
            action: 3,
            idcategorie_personnel: node.uid,
            idcategories: node.uid,
            idsociete: this.users?.datasociete?.uid,
            idpersonnel: this.users?.datapersonnel?.uid,
            name_categories: node.name_categories,
            position: node.id,
            actif: false,
            parent: '',
        };
        this.httService.postData(
            `${environment.api_url}auth/:save-categorie-plan-classement-personnel`,
            payload,
            this.users?.access_token || ''
        ).toPromise().then(() => {
            if (this.selectedNode?.uid === node.uid) {
                this.selectAllFolders();
            }
            this.showPlanClassementPerso(
                this.users?.datasociete?.uid,
                this.users?.datapersonnel?.uid, ''
            );
        }).catch(() => {
        });
    }

    // ── Nouveau dossier ───────────────────────────────────
    openNewFolderModal(): void {
        this.newFolderName = '';
        this.showNewFolderModal = true;
    }

    closeNewFolderModal(): void {
        this.showNewFolderModal = false;
        this.newFolderName = '';
    }

    saveNewFolder(): void {
        const name = this.newFolderName.trim();
        if (!name) return;

        this.savingFolder = true;
        const parentUid = this.selectedNode?.uid ?? this.rootNode?.uid ?? '';
        const payload = {
            action: 1,
            idcategorie_personnel: '',
            name_categories: name,
            idsociete: this.users?.datasociete?.uid,
            idpersonnel: this.users?.datapersonnel?.uid,
            position: 1,
            actif: true,
            parent: parentUid,
        };
        this.httService.postData(
            `${environment.api_url}auth/:save-categorie-plan-classement-personnel`,
            payload,
            this.users?.access_token || ''
        ).toPromise().then(() => {
            this.savingFolder = false;
            this.closeNewFolderModal();
            // Recharger tout
            this.showPlanClassementPerso(
                this.users?.datasociete?.uid,
                this.users?.datapersonnel?.uid,
                ''
            );
        }).catch(() => {
            this.savingFolder = false;
            this.closeNewFolderModal();
        });
    }

    // ── Importer un fichier ───────────────────────────────
    triggerImport(): void {
        this.fileInput.nativeElement.click();
    }

    async onFileSelected(event: Event): Promise<void> {
        const input = event.target as HTMLInputElement;
        const files = Array.from(input.files || []);
        if (!files.length) return;

        this.importingFile = true;
        this.importTotal = files.length;
        this.importCurrent = 0;

        for (const file of files) {
            this.importCurrent++;
            this.importFileName = file.name;

            const formData = new FormData();
            formData.append('action', '1');
            formData.append('uid_filepersonnel', '');
            formData.append('nom_fichiers', file.name);
            formData.append('piece_jointe', file);
            formData.append('idsociete', this.users?.datasociete?.uid || '');
            formData.append('personnel_uid', this.users?.datapersonnel?.uid || '');
            formData.append('idcategorie_personnel', this.selectedNode?.uid || '');

            try {
                await this.httService.postDataMultipart(
                    `${environment.api_url}auth/:save-fichier-personnel`,
                    formData,
                    this.users?.access_token || ''
                ).toPromise();
            } catch {
                // on continue les fichiers suivants même en cas d'erreur
            }
        }

        this.importingFile = false;
        this.importFileName = '';
        this.importTotal = 0;
        this.importCurrent = 0;
        input.value = '';
        this.refreshData();
    }

    // ── Extension propre (retire ?query et #hash des URL signées S3) ──
    private cleanExt(item: any): string {
        const src = item?.nom_fichiers || item?.name || item?.url_file || item?.piece_jointe || '';
        const clean = String(src).split('?')[0].split('#')[0];
        return (clean.split('.').pop() || '').toLowerCase();
    }

    // ── Icônes fichiers ───────────────────────────────────
    getFileIconClass(item: any): string {
        const ext = this.cleanExt(item);
        if (ext === 'pdf') return 'fa-file-pdf';
        if (['doc', 'docx'].includes(ext)) return 'fa-file-word';
        if (['xls', 'xlsx'].includes(ext)) return 'fa-file-excel';
        if (['ppt', 'pptx'].includes(ext)) return 'fa-file-powerpoint';
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext)) return 'fa-file-image';
        if (['zip', 'rar', '7z', 'tar'].includes(ext)) return 'fa-file-archive';
        if (['mp4', 'avi', 'mov', 'mkv'].includes(ext)) return 'fa-file-video';
        if (['mp3', 'wav', 'aac'].includes(ext)) return 'fa-file-audio';
        return 'fa-file-alt';
    }

    getFileExtLabel(item: any): string {
        const ext = this.cleanExt(item);
        const labels: Record<string, string> = {
            pdf: 'Document PDF', doc: 'Document Word', docx: 'Document Word',
            xls: 'Feuille Excel', xlsx: 'Feuille Excel',
            ppt: 'Présentation', pptx: 'Présentation',
            jpg: 'Image JPEG', jpeg: 'Image JPEG', png: 'Image PNG',
            gif: 'Image GIF', bmp: 'Image BMP', svg: 'Image SVG', webp: 'Image WebP',
            zip: 'Archive ZIP', rar: 'Archive RAR', '7z': 'Archive 7-Zip',
            mp4: 'Vidéo MP4', avi: 'Vidéo AVI', mov: 'Vidéo MOV',
            mp3: 'Audio MP3', wav: 'Audio WAV',
        };
        return labels[ext] || (ext ? ext.toUpperCase() + ' File' : 'Fichier');
    }

    getFileIconColor(item: any): string {
        const colorMap: Record<string, string> = {
            'fa-file-pdf': '#E53E3E',
            'fa-file-word': '#3182CE',
            'fa-file-excel': '#276749',
            'fa-file-powerpoint': '#DD6B20',
            'fa-file-image': '#805AD5',
            'fa-file-archive': '#718096',
            'fa-file-video': '#00B5D8',
            'fa-file-audio': '#D69E2E',
            'fa-file-alt': '#4A5568',
        };
        return colorMap[this.getFileIconClass(item)] || '#4A5568';
    }

    // ── Prévisualisation ──────────────────────────────────
    openPreview(item: ContentItem): void {
        if (!item || item.type !== 'file') return;
        this.selectRow(item);
        this.previewFile = item;
        this.showPreview = true;
        this.isLoadingPreview = true;
        this.zoomLevel = 1.0;
        this.rotation = 0;
        this.currentPage = 1;
        this.totalPages = 0;
        this.currentPdfDoc = null;
        this.previewOfficeUrl = null;

        const url = item.url_file || item.piece_jointe || '';
        this.previewUrl = url;
        this.previewExt = this.cleanExt(item);

        if (this.previewExt === 'pdf') {
            setTimeout(() => this.renderPdf(url), 80);
        } else if (this.isPreviewOffice) {
            this.startOfficeTimer();
            this.previewOfficeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
            );
        } else if (this.isPreviewImage) {
            this.isLoadingPreview = false;
        } else {
            this.isLoadingPreview = false;
        }
    }

    closePreview(): void {
        this.showPreview = false;
        this.previewFile = null;
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

    // Zoom
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

    // Rotation
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

    // Pagination
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

    // Rendu PDF
    private renderPdf(url: string): void {
        this.currentPage = 1;
        this.currentPdfDoc = null;
        pdfjsLib.getDocument({url}).promise.then((pdf: any) => {
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
            const canvas = document.getElementById('fm-pdf-canvas') as HTMLCanvasElement;
            if (!canvas) return;

            // 100 % = ajusté à la largeur du panneau ; le zoom multiplie cette base
            const base = page.getViewport({scale: 1, rotation: this.rotation});
            const container = canvas.parentElement as HTMLElement | null;
            const avail = (container?.clientWidth || base.width) - 32; // padding 16px de chaque côté
            const fitScale = avail > 0 ? avail / base.width : 1;
            const cssScale = fitScale * this.zoomLevel;

            // Rendu à la résolution de l'écran pour rester net (retina)
            const dpr = window.devicePixelRatio || 1;
            const viewport = page.getViewport({scale: cssScale * dpr, rotation: this.rotation});
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.width = (viewport.width / dpr) + 'px';
            canvas.style.height = (viewport.height / dpr) + 'px';

            page.render({canvasContext: canvas.getContext('2d')!, viewport}).promise.then(() => {
                setTimeout(() => {
                    this.isLoadingPreview = false;
                    this.cdr.detectChanges();
                }, 0);
            });
        });
    }

    // Téléchargement direct depuis le menu d'actions
    async downloadFile(item: ContentItem): Promise<void> {
        if (!item) return;
        const url = item.url_file || item.piece_jointe || '';
        if (!url) return;

        const ext = url.split('.').pop()?.toLowerCase() ?? '';
        const filename = item.name?.includes('.') ? item.name : `${item.name}.${ext}`;

        const res = await fetch(url, {mode: 'cors', credentials: 'omit'});
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
    }

    // ── Supprimer un fichier ──────────────────────────────
    async deleteFile(item: ContentItem): Promise<void> {
        if (!item) return;

        const result = await Swal.fire({
            html: `
              <div style="margin-top: 8px;">
                <p style="font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 10px;">
                  Êtes-vous sûr de vouloir supprimer ce fichier ?
                </p>
                <p style="font-size: 13px; color: #64748B; margin: 0;">
                  Le fichier <strong>${item.name}</strong> sera définitivement supprimé.
                </p>
              </div>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        const formData = new FormData();
        formData.append('action', '3');
        formData.append('uid_filepersonnel', item.uid ?? '');
        formData.append('idsociete', this.users?.datasociete?.uid ?? '');
        formData.append('personnel_uid', this.users?.datapersonnel?.uid ?? '');

        this.httService
            .postDataMultipart(
                `${environment.api_url}auth/:save-fichier-personnel`,
                formData,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.toast.success('Fichier supprimé avec succès.', 'Succès');
                    if (this.previewFile?.uid === item.uid) {
                        this.closePreview();
                    }
                    this.refreshData();
                } else {
                    this.toast.error(res.body.message || 'Erreur lors de la suppression.', 'Erreur');
                }
            })
            .catch(() => {
                this.toast.error('Erreur lors de la suppression du fichier.', 'Erreur');
            });
    }

    // Téléchargement depuis le panneau de prévisualisation
    async downloadPreview(): Promise<void> {
        if (!this.previewUrl) return;
        const ext = this.previewExt ? `.${this.previewExt}` : '';
        const name = this.previewFile?.name ?? 'fichier';
        const filename = name.includes('.') ? name : `${name}${ext}`;

        const res = await fetch(this.previewUrl, {mode: 'cors', credentials: 'omit'});
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
    }

    // Impression
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

    // Requis par AddModalComponent
    handleModal(value: boolean): void {
        if (value) {
            this.showPlanClassementPerso(
                this.users?.datasociete?.uid,
                this.users?.datapersonnel?.uid,
                ''
            );
        }
    }
}
