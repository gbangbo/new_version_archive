import {
    Component, OnInit, ElementRef, ViewChild
} from '@angular/core';
import html2canvas from 'html2canvas';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {FlatTreeControl} from "@angular/cdk/tree";
import {NzTreeFlatDataSource, NzTreeFlattener} from "ng-zorro-antd/tree-view";
import {FlatNode, TreeNode} from "./tree-node.model";
import {DomSanitizer} from "@angular/platform-browser";
import moment from "moment";
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {FormsModule} from "@angular/forms";
import {AddModalComponent} from "./add-modal/add-modal.component";


const TREE_DATA: TreeNode[] = [];

@Component({
    selector: 'app-nomination',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        FormsModule,
        FeatherIconComponent,
        NzTreeSelectModule, AddModalComponent
    ],
    templateUrl: './nomination.component.html',
    styleUrl: './nomination.component.scss',
})
export class NominationComponent implements OnInit {

    @ViewChild('orgChart', { static: false }) orgChartRef!: ElementRef;

    isDownloading: boolean = false;

    // ── Données ──────────────────────────────────────────────
    dataSociete: any = [];
    dataLigne: any = {};
    users: any = {};
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;
    searchValue: string = '';
    idsociete: string = '';

    private dataBenef: any = [];

    treeData: TreeNode[] = TREE_DATA;
    rootNode: any = null;
    selectedNode: any = null;

    zoomLevel: number = 1;
    readonly ZOOM_STEP = 0.1;
    readonly ZOOM_MIN = 0.3;
    readonly ZOOM_MAX = 2.0;

    // ── Couleurs par niveau (extensible) ─────────────────────
    private readonly LEVEL_CLASSES = [
        'org-card-l1',
        'org-card-l2',
        'org-card-l3',
        'org-card-l4',
        'org-card-ln', // fallback N+
    ];

    private readonly ARROW_COLORS = [
        '#1e3a5f',
        '#4a6080',
        '#667085',
        '#8894a8',
        '#aab0bc',
    ];

    private readonly LINE_COLORS = [
        '#b0bac8',
        '#b8c2d0',
        '#c0cad6',
        '#c8d0da',
        '#d0d8e0',
    ];

    // ── Tree view (conservé pour dataSource) ─────────────────
    private transformer = (node: TreeNode, level: number): FlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        sigle: node.sigle || '',
        datasociete: node.datasociete || {},
        datausers: node?.datausers.length ? node.datausers[0] : {},
        libelle: node.libelle || '',
        created_at: node.created_at || '',
        actif: node.actif ?? true,
        position: node.position || 0,
        libcolor: node.libcolor,
        _color: node._color,
        auth: node.auth || '',
        key: node.key,
        id: node.id,
        level,
        disabled: !!node.disabled,
    });

    treeControl = new FlatTreeControl<FlatNode>(
        node => node.level,
        node => node.expandable
    );

    treeFlattener = new NzTreeFlattener<TreeNode, FlatNode>(
        this.transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );

    dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

    readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private sanitizer: DomSanitizer
    ) {
    }

    // ── Lifecycle ─────────────────────────────────────────────
    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showOrganigramme(this.users?.datasociete?.uid, '');
    }

    // ── Chargement organigramme ───────────────────────────────
    showOrganigramme(idsociete: string = '', niveau: string = ''): void {
        this.isloading = true;
        this.dataBenef = [];
        this.rootNode = null;
        this.treeData = [];

        this.httService
            .getData(
                // `${environment.api_url}auth/:save-nommination-responsable-service?societe=${idsociete}&niveau=${niveau}`,
                // `${environment.api_url}auth/:save-service-organigramme?societe=${idsociete}&niveau=${niveau}`,
                `${environment.api_url}auth/:organigramme-responsable-service?idsociete=${idsociete}&niveau=${niveau}`,
                false,
                this.users?.access_token || ''
            )
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("responsable orga ====", res.body.data)
                if (res.body.status || res.body.success) {

                    this.dataBenef = res.body.data.map((e: any) => ({
                        ...e,
                        libcolor: !e?.actif ? 'Actif' : 'Desactivé',
                        _color: !e?.actif ? '#87d068' : '#2db7f5',
                    }));

                    // Un seul nœud racine avec enfants → DG + ses enfants
                    if (this.dataBenef.length === 1 && this.dataBenef[0].children?.length) {
                        this.rootNode = this.mapApiToTree([this.dataBenef[0]])[0];
                        this.treeData = this.mapApiToTree(this.dataBenef[0].children);
                    } else {
                        // Plusieurs racines
                        this.rootNode = null;
                        this.treeData = this.mapApiToTree(this.dataBenef);
                    }

                    this.dataSource.setData(this.treeData);

                    console.log('rootNode :', this.rootNode);
                    console.log('treeData :', this.treeData);
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    // ── Mapper API → TreeNode récursif ────────────────────────
    mapApiToTree(data: any[]): TreeNode[] {
        return data.map(item => ({
            name: item?.libelle,
            key: item?.uid,
            id: item?.id,
            sigle: item?.sigle,
            libelle: item?.libelle,
            created_at: item.created_at ? moment(item.created_at).format('DD-MM-YYYY') : '',
            position: item?.lft,
            apiLevel: item?.level,
            datasociete: item.datasociete || {},
            datausers: item?.datausers.length ? item.datausers[0] : {},
            actif: true,
            auth: item?.auth || '',
            libcolor: 'Actif',
            _color: '#87d068',
            disabled: false,
            children: item.children?.length > 0
                ? this.mapApiToTree(item.children)
                : undefined,
        }));
    }

    // ── Changement de société ─────────────────────────────────
    onChange($event: any): void {
        this.selectedNode = null;
        this.showOrganigramme($event || this.users?.datasociete?.uid, '');
    }

    formatNode(node: any): any {
        return {
            title: node.raison_sociale,
            key: node.uid,
            isLeaf: !node.children || node.children.length === 0,
            children: node.children?.map((child: any) => this.formatNode(child)) || [],
        };
    }

    // ── Clic sur un nœud ─────────────────────────────────────
    onNodeClick(node: any): void {
        this.selectedNode = node;
        this.dataLigne = {...node};
        this.modalOpen = true;
    }

    // ── Helpers dynamiques pour le template récursif ─────────
    getCardClass(depth: number): string {
        const idx = Math.min(depth, this.LEVEL_CLASSES.length - 1);
        return this.LEVEL_CLASSES[idx];
    }

    getArrowColor(depth: number): string {
        const idx = Math.min(depth, this.ARROW_COLORS.length - 1);
        return this.ARROW_COLORS[idx];
    }

    getLineColor(depth: number): string {
        const idx = Math.min(depth, this.LINE_COLORS.length - 1);
        return this.LINE_COLORS[idx];
    }

    handleModal(value: boolean) {
        if (value) {
            this.showOrganigramme(this.users?.datasociete?.uid, '');
        }
        this.modalOpen = false;
    }

    zoomIn(): void {
        this.zoomLevel = Math.min(this.ZOOM_MAX, +(this.zoomLevel + this.ZOOM_STEP).toFixed(1));
    }

    zoomOut(): void {
        this.zoomLevel = Math.max(this.ZOOM_MIN, +(this.zoomLevel - this.ZOOM_STEP).toFixed(1));
    }

    resetZoom(): void {
        this.zoomLevel = 1;
    }

    async downloadChart(): Promise<void> {
        const el = this.orgChartRef?.nativeElement as HTMLElement;
        if (!el || this.isDownloading) return;

        this.isDownloading = true;
        try {
            // Capturer le contenu réel (sans zoom CSS pour avoir la pleine résolution)
            const canvas = await html2canvas(el, {
                scale: 2,                // ×2 pour une image nette
                backgroundColor: '#f7f8fa',
                useCORS: true,
                logging: false,
            });

            const contentW = canvas.width;
            const contentH = canvas.height;
            const padding = 60;         // marges intérieures en px (@scale 2)

            // Toile finale centrée : portrait si hauteur > largeur
            const finalW = contentW + padding * 2;
            const finalH = contentH + padding * 2;

            const out = document.createElement('canvas');
            out.width  = finalW;
            out.height = finalH;
            const ctx = out.getContext('2d')!;

            // Fond blanc
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, finalW, finalH);

            // Organigramme centré
            ctx.drawImage(canvas, padding, padding);

            // Téléchargement
            const link = document.createElement('a');
            link.download = `nomination_${new Date().toISOString().slice(0, 10)}.png`;
            link.href = out.toDataURL('image/png');
            link.click();
        } finally {
            this.isDownloading = false;
        }
    }

}