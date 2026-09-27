import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from "ng-zorro-antd/tooltip";
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {SvgIconComponent} from "../../../shared/components/ui/svg-icon/svg-icon.component";
import {AddModalComponent} from "./add-modal/add-modal.component";
import {SelectionModel} from "@angular/cdk/collections";
import {FlatTreeControl} from "@angular/cdk/tree";
import {NzTreeFlatDataSource, NzTreeFlattener, NzTreeViewModule} from "ng-zorro-antd/tree-view";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import Swal from "sweetalert2";

interface MenuTreeNode {
    title: string;
    key: string;
    id: number;
    path: string;
    icon: string;
    iconType: string;
    rang: number;
    position: number;
    actif: boolean;
    color?: string;
    auth?: string;
    disabled?: boolean;
    children?: MenuTreeNode[];
}

interface MenuFlatNode {
    expandable: boolean;
    title: string;
    key: string;
    id: number;
    path: string;
    icon: string;
    iconType: string;
    rang: number;
    level: number;
    position: number;
    actif: boolean;
    color?: string;
    auth?: string;
    disabled: boolean;
}

@Component({
    selector: 'app-onglet',
    imports: [
        CommonModule,
        FormsModule,
        CardComponent,
        NzTooltipDirective,
        NzIconModule,
        NzTagModule,
        NzTreeViewModule,
        FeatherIconComponent,
        SvgIconComponent,
        AddModalComponent
    ],
    templateUrl: './onglet.component.html',
    styleUrl: './onglet.component.scss'
})
export class OngletComponent implements OnInit, AfterViewInit {
    // ── Ascenseur horizontal dessiné (les barres natives sont masquées sur iOS) ──
    @ViewChild('tableWrap') tableWrap?: ElementRef<HTMLDivElement>;
    @ViewChild('hBar') hBar?: ElementRef<HTMLDivElement>;
    hScrollVisible = false;     // le tableau déborde-t-il ?
    hScrollMore = false;        // reste-t-il des colonnes à droite ?
    thumbWidth = 0;
    thumbLeft = 0;
    private dragging = false;
    private dragStartX = 0;
    private dragStartScroll = 0;


    private users: any = [];
    isloading: boolean = false;
    modalOpen: boolean = false;
    dataOneLigne: any = {};
    searchValue = '';

    /** Public : le panneau de creation s'en sert pour le parent,
     *  le placement et l'apercu. */
    treeData: MenuTreeNode[] = [];

    private transformer = (node: MenuTreeNode, level: number): MenuFlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        title: node.title,
        key: node.key,
        id: node.id,
        path: node.path,
        icon: node.icon,
        iconType: node.iconType,
        rang: node.rang,
        level,
        position: node.position,
        actif: node.actif,
        color: node.color,
        auth: node.auth,
        disabled: !!node.disabled
    });

    treeControl = new FlatTreeControl<MenuFlatNode>(
        node => node.level,
        node => node.expandable
    );

    treeFlattener = new NzTreeFlattener<MenuTreeNode, MenuFlatNode>(
        this.transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );

    dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

    readonly hasChild = (_: number, node: MenuFlatNode): boolean => node.expandable;

    selectListSelection = new SelectionModel<MenuFlatNode>(
        false, [], true,
        (a, b) => a.key === b.key
    );

    constructor(
        private autor: Authorization,
        private httService: HttpService,
        private sanitizer: DomSanitizer
    ) {}

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

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showMenu(this.users?.datasociete?.uid || this.users?.uidsociete);
    }

    showMenu(idsociete: string = '') {
        this.isloading = true;
        this.treeData = [];
        this.dataSource.setData([]);
        setTimeout(() => this.syncHScroll());
        this.httService.getData(
            `${environment.api_url}auth/:menu?idsociete=${idsociete}`,
            false,
            this.users?.access_token || ''
        ).toPromise().then((res: any) => {
            this.isloading = false;
            if (res.body.status || res.body.success) {
                this.treeData = this.mapApiToTree(res.body.data);
                this.dataSource.setData(this.treeData);
                setTimeout(() => this.syncHScroll());
            }
        }).catch(() => {
            this.isloading = false;
        });
    }

    mapApiToTree(data: any[]): MenuTreeNode[] {
        return data.map(item => ({
            title: item.title,
            key: item.uid,
            id: item.id,
            path: item.path,
            icon: item.icon,
            iconType: item.iconType,
            rang: item.rang,
            position: item.position,
            actif: item.actif,
            color: item.actif ? '#87d068' : '#9a0218',
            auth: item.actif ? 'Actif' : 'Inactif',
            disabled: false,
            children: item.children?.length > 0
                ? this.mapApiToTree(item.children)
                : undefined
        }));
    }

    onNodeSelect(node: MenuFlatNode): void {
        if (this.selectListSelection.isSelected(node)) {
            this.selectListSelection.deselect(node);
            return;
        }
        this.selectListSelection.clear();
        this.selectListSelection.select(node);
    }

    onSearch(value: string): void {
        this.searchValue = value;
        if (!value || value.trim() === '') {
            this.dataSource.setData(this.treeData);
            setTimeout(() => this.syncHScroll());
            setTimeout(() => {
                const first = this.treeControl.dataNodes?.[0];
                if (first) this.treeControl.expand(first);
            }, 0);
            return;
        }
        const filtered = this.filterTree(this.treeData, value.toLowerCase());
        this.dataSource.setData(filtered);
        setTimeout(() => this.syncHScroll());
        setTimeout(() => this.treeControl.expandAll(), 0);
    }

    private filterTree(nodes: MenuTreeNode[], search: string): MenuTreeNode[] {
        const result: MenuTreeNode[] = [];
        for (const node of nodes) {
            const matches = node.title?.toLowerCase().includes(search)
                || node.path?.toLowerCase().includes(search)
                || node.icon?.toLowerCase().includes(search);
            const filteredChildren = node.children?.length
                ? this.filterTree(node.children, search)
                : [];
            if (matches || filteredChildren.length > 0) {
                result.push({
                    ...node,
                    children: filteredChildren.length > 0 ? filteredChildren : node.children
                });
            }
        }
        return result;
    }

    highlightMatch(text: string, search: string): SafeHtml {
        if (!search || !text) return text;
        const regex = new RegExp(`(${search})`, 'gi');
        const highlighted = text.replace(
            regex,
            '<mark style="background:#FEF08A;color:#713F12;border-radius:2px;padding:0 2px">$1</mark>'
        );
        return this.sanitizer.bypassSecurityTrustHtml(highlighted);
    }

    findParent(nodes: MenuTreeNode[], childId: number, parent: any = null): any {
        for (const node of nodes) {
            if (node.id === childId) return parent;
            if (node.children?.length) {
                const result = this.findParent(node.children, childId, node);
                if (result) return result;
            }
        }
        return null;
    }

    async deleteMenu(node: MenuFlatNode) {
        const result = await Swal.fire({
            html: `
              <div style="margin-top:8px;">
                <p style="font-size:17px;font-weight:700;color:#0F172A;margin-bottom:10px;">
                  Supprimer ce sous-menu ?
                </p>
                <p style="font-size:13px;color:#64748B;margin:0;">
                  « ${node.title} » sera définitivement supprimé.
                </p>
              </div>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            const payload = {
                action: 3,
                idmenu: node.key,
                idsociete: this.users?.datasociete?.uid || this.users?.uidsociete,
            };
            this.httService.postData(
                `${environment.api_url}auth/:menu`,
                payload,
                this.users?.access_token || ''
            ).toPromise().then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.showMenu(this.users?.datasociete?.uid || this.users?.uidsociete);
                    Swal.fire({ title: res?.body?.message, icon: 'success', confirmButtonText: 'OK' });
                }
            }).catch(() => {});
        }
    }

    handleModal(value: boolean) {
        if (value) {
            this.showMenu(this.users?.datasociete?.uid || this.users?.uidsociete);
        }
        this.modalOpen = false;
    }

    openModal(row?: any, sens?: string) {
        this.modalOpen = true;
        if (row && sens === 'm') {
            // Modification : pré-remplir le formulaire avec les données du nœud
            const parent = this.findParent(this.treeData, row.id);
            this.dataOneLigne = {
                ...row,
                idmenu: row.key,           // déclenche action=2 (update) dans le modal
                icontype: row.iconType,    // le form control s'appelle "icontype" (minuscule)
                parent: parent?.key || ''
            };
        } else if (row && sens === 'a') {
            // Ajout d'un enfant : formulaire vide, seul le parent est transmis
            this.dataOneLigne = {
                parent: row.key            // le nœud cliqué devient le parent
            };
        } else {
            // Nouveau menu racine : formulaire entièrement vide
            this.dataOneLigne = {};
        }
    }
}
