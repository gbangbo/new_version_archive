import {Component, Input, OnInit, OnChanges, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeNode} from "../tree-node.model";


interface LayoutNode {
    node: TreeNode;
    x: number;
    y: number;
    level: number;
    _width: number;
}

interface Edge {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

@Component({
    selector: 'app-exporte-model',
    imports: [CommonModule],
    templateUrl: './exporte-model.component.html',
    styleUrl: './exporte-model.component.scss',
})
export class ExporteModelComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() treeData: TreeNode[] = [];
    @Input() title: string = 'Plan de classement';
    @ViewChild('treeCanvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;

    private viewReady = false;  // ← flag

    private readonly NODE_W = 140;
    private readonly NODE_H = 38;
    private readonly H_GAP = 24;
    private readonly V_GAP = 60;
    private readonly PADDING = 40;

    layoutNodes: LayoutNode[] = [];
    private edges: Edge[] = [];
    private totalW = 0;
    private totalH = 0;

    private readonly COLORS = [
        {fill: '#FAECE7', stroke: '#993C1D', text: '#712B13'},
        {fill: '#E6F1FB', stroke: '#185FA5', text: '#0C447C'},
        {fill: '#E1F5EE', stroke: '#0F6E56', text: '#085041'},
        {fill: '#FAEEDA', stroke: '#854F0B', text: '#633806'},
        {fill: '#EEEDFE', stroke: '#534AB7', text: '#3C3489'},
    ];

    private readonly COLORS_DARK = [
        {fill: '#4A1B0C', stroke: '#F0997B', text: '#F5C4B3'},
        {fill: '#042C53', stroke: '#85B7EB', text: '#B5D4F4'},
        {fill: '#04342C', stroke: '#5DCAA5', text: '#9FE1CB'},
        {fill: '#412402', stroke: '#EF9F27', text: '#FAC775'},
        {fill: '#26215C', stroke: '#AFA9EC', text: '#CECBF6'},
    ];

    ngOnInit(): void {
        this.renderCanvas();
    }


    ngOnChanges(): void {
        console.log("this.treeData ====", this.treeData)
        if (!this.viewReady) return; // ← skip si canvas pas encore prêt
        this.renderCanvas();
    }

    ngAfterViewInit(): void {
        this.viewReady = true;       // ← canvas disponible
        this.renderCanvas();
    }


    // ── Mesure récursive de la largeur de chaque sous-arbre ──────────────
    private measureTree(node: TreeNode & { _width?: number }, level = 0): void {
        if (!node.children || !node.children.length) {
            node._width = this.NODE_W;
            return;
        }
        node.children.forEach(c => this.measureTree(c as any, level + 1));
        const total = (node.children as any[]).reduce((s: number, c: any) => s + c._width, 0)
            + (node.children.length - 1) * this.H_GAP;
        node._width = Math.max(this.NODE_W, total);
    }

    // ── Placement récursif ────────────────────────────────────────────────
    private layoutTree(node: any, x: number, y: number, level: number): void {
        const lNode: LayoutNode = {
            node,
            x: x + (node._width - this.NODE_W) / 2,
            y,
            level,
            _width: node._width,
        };
        this.layoutNodes.push(lNode);

        if (!node.children || !node.children.length) return;

        let cx = x;
        node.children.forEach((child: any) => {
            this.edges.push({
                x1: lNode.x + this.NODE_W / 2,
                y1: lNode.y + this.NODE_H,
                x2: cx + child._width / 2,
                y2: y + this.NODE_H + this.V_GAP,
            });
            this.layoutTree(child, cx, y + this.NODE_H + this.V_GAP, level + 1);
            cx += child._width + this.H_GAP;
        });
    }

    // ── Construction de la forêt (plusieurs racines) ──────────────────────
    private buildForest(): void {
        this.layoutNodes = [];
        this.edges = [];

        const forest = this.treeData as any[];
        forest.forEach(r => this.measureTree(r, 0));

        let cx = this.PADDING;
        forest.forEach(r => {
            this.layoutTree(r, cx, this.PADDING, 0);
            cx += r._width + this.H_GAP * 2;
        });

        const maxX = this.layoutNodes.reduce((m, n) => Math.max(m, n.x + this.NODE_W), 0);
        const maxY = this.layoutNodes.reduce((m, n) => Math.max(m, n.y + this.NODE_H), 0);
        this.totalW = maxX + this.PADDING;
        this.totalH = maxY + this.PADDING + 30;
    }

    // ── Arrondi des coins canvas ──────────────────────────────────────────
    private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number,
                      w: number, h: number, r: number): void {
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

    // ── Rendu principal ───────────────────────────────────────────────────
    renderCanvas(): void {
        if (!this.treeData?.length) return;
        if (!this.canvasRef?.nativeElement) return;
        this.buildForest();

        const canvas = this.canvasRef.nativeElement;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = this.totalW * dpr;
        canvas.height = this.totalH * dpr;
        canvas.style.width = this.totalW + 'px';
        canvas.style.height = this.totalH + 'px';

        const ctx = canvas.getContext('2d')!;
        ctx.scale(dpr, dpr);

        const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const palette = dark ? this.COLORS_DARK : this.COLORS;

        // Fond
        ctx.fillStyle = dark ? '#1a1a1a' : '#ffffff';
        ctx.fillRect(0, 0, this.totalW, this.totalH);

        // Connexions (courbes de Bézier)
        ctx.strokeStyle = dark ? '#555' : '#CBD5E1';
        ctx.lineWidth = 1;
        this.edges.forEach(e => {
            const my = (e.y1 + e.y2) / 2;
            ctx.beginPath();
            ctx.moveTo(e.x1, e.y1);
            ctx.bezierCurveTo(e.x1, my, e.x2, my, e.x2, e.y2);
            ctx.stroke();
        });

        // Nœuds
        this.layoutNodes.forEach(ln => {
            const c = palette[Math.min(ln.level, palette.length - 1)];
            this.roundRect(ctx, ln.x, ln.y, this.NODE_W, this.NODE_H, 8);
            ctx.fillStyle = c.fill;
            ctx.fill();
            ctx.strokeStyle = c.stroke;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.fillStyle = c.text;
            ctx.font = `${ln.level === 0 ? '600' : '500'} 12px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Troncature si trop long
            let label = ln.node.name;
            const maxW = this.NODE_W - 16;
            while (ctx.measureText(label).width > maxW && label.length > 3) {
                label = label.slice(0, -1);
            }
            if (label !== ln.node.name) label = label.slice(0, -1) + '…';
            ctx.fillText(label, ln.x + this.NODE_W / 2, ln.y + this.NODE_H / 2);
        });

        // Légende
        const legend = ['Racine', 'Niveau 1', 'Niveau 2', 'Niveau 3', 'Niveau 4+'];
        let lx = this.PADDING;
        const ly = this.totalH - 14;
        legend.forEach((label, i) => {
            const c = palette[i];
            this.roundRect(ctx, lx, ly - 10, 12, 12, 3);
            ctx.fillStyle = c.fill;
            ctx.fill();
            ctx.strokeStyle = c.stroke;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.fillStyle = dark ? '#aaa' : '#64748B';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, lx + 16, ly - 4);
            lx += ctx.measureText(label).width + 36;
        });
    }

    // ── Export PNG ────────────────────────────────────────────────────────
    exportPNG(): void {
        this.renderCanvas();
        const canvas = this.canvasRef.nativeElement;
        const link = document.createElement('a');
        link.download = `${this.title.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
}