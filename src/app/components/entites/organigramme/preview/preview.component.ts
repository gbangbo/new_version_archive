import {
    Component, OnInit, AfterViewInit,
    ElementRef, ViewChild
} from '@angular/core';
import {CardComponent} from "../../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {Authorization} from "../../../../protect/authorization.service";
import {HttpService} from "../../../../core/http.service";
import {environment} from "../../../../../environments/environment";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FeatherIconComponent} from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import {FlatTreeControl} from "@angular/cdk/tree";
import {NzTreeFlatDataSource, NzTreeFlattener} from "ng-zorro-antd/tree-view";
import {FlatNode, TreeNode} from "../tree-node.model";
import {DomSanitizer} from "@angular/platform-browser";
import moment from "moment";
import {NzTreeSelectModule} from "ng-zorro-antd/tree-select";
import {FormsModule} from "@angular/forms";


const TREE_DATA: TreeNode[] = [];

@Component({
    selector: 'app-preview',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        FormsModule,
        FeatherIconComponent, NzTreeSelectModule],
    templateUrl: './preview.component.html',
    styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit, AfterViewInit {
    dataSociete: any = [];
    dataLigne: any = [];
    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;


    searchValue = '';
    idsociete: string = '';
    // ── Données ──────────────────────────────────────────────

    filteredData: any = [];

    private dataBenef: any = [];
    expandKeys: any = [];

    /**
     *Systeme tree view
     */


    treeData: TreeNode[] = TREE_DATA;


    private transformer = (node: TreeNode, level: number): FlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        sigle: node.sigle || '',
        datasociete: node.datasociete || {},
        libelle: node.libelle || '',
        created_at: node.created_at || '',
        actif: node.actif ?? true,
        position: node.position || 0,
        libcolor: node.libcolor,
        _color: node._color,
        key: node.key,
        id: node.id,
        level,
        disabled: !!node.disabled
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


    @ViewChild('orgCanvas', {static: false})
    canvasRef!: ElementRef<HTMLCanvasElement>;

    private viewReady = false;

// Constantes canvas
    private readonly NODE_W = 140;  // ← était 180
    private readonly NODE_H = 50;   // ← garde
    private readonly H_GAP = 20;    // ← était 30
    private readonly V_GAP = 60;    // ← était 70
    private readonly PADDING = 30;  // ← était 50

    private layoutNodes: any[] = [];
    private edges: any[] = [];
    private totalW = 0;
    private totalH = 0;

    private readonly PALETTE = [
        {fill: '#E8522A', stroke: '#C43D18', text: '#ffffff'}, // racine
        {fill: '#F4A030', stroke: '#D4831A', text: '#ffffff'}, // niveau 1
        {fill: '#F5C842', stroke: '#D4A820', text: '#ffffff'}, // niveau 2
        {fill: '#4CAF89', stroke: '#2E8F6A', text: '#ffffff'}, // niveau 3
        {fill: '#5B9BD5', stroke: '#3A7AB5', text: '#ffffff'}, // niveau 4+
    ];


    readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;

    constructor(private autor: Authorization, private httService: HttpService, private sanitizer: DomSanitizer) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showOrganigramme(this.users?.datasociete?.uid, '');
        this.showSociete(this.users?.datasociete?.code_societe)
    }

    ngAfterViewInit(): void {
        this.viewReady = true;
        if (this.treeData?.length) {
            setTimeout(() => this.renderOrg(), 100);
        }
    }

    showOrganigramme(idsociete: string = '', niveau: string = '',) {
        this.isloading = true;
        this.dataBenef = [];
        this.httService.getData(`${environment.api_url}auth/:save-service-organigramme?societe=${idsociete}&niveau=${niveau}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;

                if (res.body.status || res.body.success) {
                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e,
                            // created_at: e.created_at ? moment(e.created_at).format('DD-MM-YYYY') : '',
                            libcolor: `${!e?.actif ? 'Actif' : 'Desactivé'}`,
                            _color: !e?.actif ? '#87d068' : '#2db7f5',
                        }
                    });

                    this.treeData = this.mapApiToTree(this.dataBenef);
                    this.dataSource.setData(this.treeData);
                    console.log("res.body.data", res.body.data)
                    console.log(" this.treeData ", this.treeData)


                    setTimeout(() => {
                        if (this.viewReady) this.renderOrg();
                    }, 100);


                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }


    /**
     * Systeme tree view
     */

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
            actif: true,
            color: '#2db7f5',
            auth: '',
            libcolor: 'Actif',
            _color: '#87d068',
            disabled: false,
            children: item.children?.length > 0
                ? this.mapApiToTree(item.children)
                : undefined
        }));
    }

    onChange($event: any) {
        this.showOrganigramme($event || this.users?.datasociete?.uid, '');
    }


    showSociete(code_societe: string = '') {
        this.dataSociete = [];
        this.httService.getData(`${environment.api_url}auth/:savesociete?code_societe=${code_societe}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.dataSociete = res.body.data.map((e: any) => {
                        return this.formatNode(e);
                    });
                }
            })
            .catch((err) => {
            });

    }

    formatNode(node: any): any {
        return {
            title: node.raison_sociale,
            key: node.uid,

            isLeaf: !node.children || node.children.length === 0,

            children: node.children?.map((child: any) => {
                return this.formatNode(child);
            }) || []
        };
    }


    // ── Layout ────────────────────────────────────────────────────────────────

    private measureTree(node: any): void {
        if (!node.children?.length) {
            node._width = this.NODE_W;
            return;
        }
        node.children.forEach((c: any) => this.measureTree(c));
        const total = node.children.reduce((s: number, c: any) => s + c._width, 0)
            + (node.children.length - 1) * this.H_GAP;
        node._width = Math.max(this.NODE_W, total);
    }

    private layoutTree(node: any, x: number, y: number, level: number): void {
        const lx = x + (node._width - this.NODE_W) / 2;
        this.layoutNodes.push({node, x: lx, y, level});

        if (!node.children?.length) return;

        let cx = x;
        node.children.forEach((child: any) => {
            this.edges.push({
                x1: lx + this.NODE_W / 2,
                y1: y + this.NODE_H,
                x2: cx + child._width / 2,
                y2: y + this.NODE_H + this.V_GAP,
            });
            this.layoutTree(child, cx, y + this.NODE_H + this.V_GAP, level + 1);
            cx += child._width + this.H_GAP;
        });
    }

    private buildForest(): void {
        this.layoutNodes = [];
        this.edges = [];

        const forest = JSON.parse(JSON.stringify(this.treeData)); // deep clone
        forest.forEach((r: any) => this.measureTree(r));

        let cx = this.PADDING;
        forest.forEach((r: any) => {
            this.layoutTree(r, cx, this.PADDING, 0);
            cx += r._width + this.H_GAP * 2;
        });

        this.totalW = this.layoutNodes.reduce(
            (m, n) => Math.max(m, n.x + this.NODE_W), 0) + this.PADDING;
        this.totalH = this.layoutNodes.reduce(
            (m, n) => Math.max(m, n.y + this.NODE_H), 0) + this.PADDING + 30;
    }

// ── Rendu canvas ──────────────────────────────────────────────────────────

    private roundRect(ctx: CanvasRenderingContext2D,
                      x: number, y: number, w: number, h: number, r: number): void {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    renderOrg(): void {
        if (!this.treeData?.length || !this.canvasRef?.nativeElement) return;

        this.buildForest();

        const canvas = this.canvasRef.nativeElement;
        const dpr = window.devicePixelRatio || 1;
        const TITLE_H = 90;

        const containerW = canvas.parentElement?.clientWidth || 800;
        const contentW = this.totalW;
        const finalW = Math.max(contentW, containerW);

        canvas.width = finalW * dpr;
        canvas.height = (this.totalH + TITLE_H) * dpr;
        canvas.style.width = finalW + 'px';
        canvas.style.height = (this.totalH + TITLE_H) + 'px';

        const ctx = canvas.getContext('2d')!;
        ctx.scale(dpr, dpr);

        // Fond général
        ctx.fillStyle = '#F8FAFC';
        ctx.fillRect(0, 0, finalW, this.totalH + TITLE_H);

        // ── CADRE TITRE société ───────────────────────────────────────────
        const societe = this.users?.datasociete?.raison_sociale || '';
        const titleW = Math.min(300, finalW - this.PADDING * 2);
        const titleX = (finalW - titleW) / 2;
        const titleY = 16;
        const titleH = 56;

        this.roundRect(ctx, titleX, titleY, titleW, titleH, 12);
        ctx.fillStyle = '#FAECE7';
        ctx.fill();
        ctx.strokeStyle = '#993C1D';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#712B13';
        ctx.font = '700 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(societe.toUpperCase(), finalW / 2, titleY + 20);

        ctx.fillStyle = '#993C1D';
        ctx.font = '500 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ORGANIGRAMME', finalW / 2, titleY + 40);

        // Ligne séparation
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.PADDING, TITLE_H);
        ctx.lineTo(finalW - this.PADDING, TITLE_H);
        ctx.stroke();

        // ── Centrer l'arbre horizontalement ──────────────────────────────
        const offsetX = (finalW - contentW) / 2;

        // ── Connexions depuis MARDINA vers les nœuds racines ─────────────
        const rootNodes = this.layoutNodes.filter(ln => ln.level === 0);

        ctx.strokeStyle = '#999999';
        ctx.lineWidth = 1.5;

        rootNodes.forEach(ln => {
            const x1 = finalW / 2;
            const y1 = titleY + titleH;
            const x2 = ln.x + offsetX + this.NODE_W / 2;
            const y2 = ln.y + TITLE_H;
            this.drawArrow(ctx, x1, y1, x2, y2);
        });

        // ── Connexions normales entre nœuds ──────────────────────────────
        ctx.strokeStyle = '#999999';
        ctx.lineWidth = 1.5;
        this.edges.forEach(e => {
            const x1 = e.x1 + offsetX;
            const x2 = e.x2 + offsetX;
            const y1 = e.y1 + TITLE_H;
            const y2 = e.y2 + TITLE_H;
            this.drawArrow(ctx, x1, y1, x2, y2);
        });

        // ── Nœuds ────────────────────────────────────────────────────────
        const palette = this.PALETTE;
        this.layoutNodes.forEach(ln => {
            const c = palette[Math.min(ln.level, palette.length - 1)];
            const nx = ln.x + offsetX;
            const ny = ln.y + TITLE_H;

            // Ombre
            ctx.shadowColor = 'rgba(0,0,0,0.12)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetY = 3;

            this.roundRect(ctx, nx, ny, this.NODE_W, this.NODE_H, 10);
            ctx.fillStyle = c.fill;
            ctx.fill();

            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;

            ctx.strokeStyle = c.stroke;
            ctx.lineWidth = 1.5;
            this.roundRect(ctx, nx, ny, this.NODE_W, this.NODE_H, 10);
            ctx.stroke();

            // Sigle
            if (ln.node.sigle) {
                ctx.fillStyle = '#ffffff';
                ctx.font = '700 12px sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(
                    ln.node.sigle,
                    nx + this.NODE_W / 2,
                    ny + 16
                );
            }

            // Nom principal
            ctx.fillStyle = '#ffffff';
            ctx.font = `${ln.level === 0 ? '700' : '600'} 10px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            let label = ln.node.name || ln.node.libelle || '';
            const maxW = this.NODE_W - 12;
            if (ctx.measureText(label).width > maxW) {
                while (ctx.measureText(label + '…').width > maxW && label.length > 1) {
                    label = label.slice(0, -1);
                }
                label = label + '…';
            }

            const textY = ln.node.sigle
                ? ny + this.NODE_H - 14
                : ny + this.NODE_H / 2;

            ctx.fillText(label, nx + this.NODE_W / 2, textY);
        });

        // ── Légende ───────────────────────────────────────────────────────
        const legend = ['Racine', 'Niveau 1', 'Niveau 2', 'Niveau 3', 'Niveau 4+'];
        ctx.font = '11px sans-serif';
        const legendTotalW = legend.reduce((s, l) => s + ctx.measureText(l).width + 36, 0);
        let lx = (finalW - legendTotalW) / 2;
        const ly = this.totalH + TITLE_H - 14;

        legend.forEach((label, i) => {
            const c = palette[i];
            this.roundRect(ctx, lx, ly - 10, 12, 12, 3);
            ctx.fillStyle = c.fill;
            ctx.fill();
            ctx.strokeStyle = c.stroke;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = '#64748B';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, lx + 16, ly - 4);
            lx += ctx.measureText(label).width + 36;
        });
    }
    private drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number): void {
        const arrowSize = 6;
        const my = (y1 + y2) / 2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.bezierCurveTo(x1, my, x2, my, x2, y2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - arrowSize, y2 - arrowSize * 1.5);
        ctx.lineTo(x2 + arrowSize, y2 - arrowSize * 1.5);
        ctx.closePath();
        ctx.fillStyle = '#999999';
        ctx.fill();
    }
// ── Export PNG ────────────────────────────────────────────────────────────

    exportPNG(): void {
        this.renderOrg();
        const canvas = this.canvasRef.nativeElement;
        const link = document.createElement('a');
        link.download = 'organigramme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}