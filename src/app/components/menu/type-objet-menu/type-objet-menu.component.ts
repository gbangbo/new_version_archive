import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import moment from "moment";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {AssocModalComponent, TypeObjetMenuAction} from "./assoc-modal/assoc-modal.component";
import {SvgIconComponent} from "../../../shared/components/ui/svg-icon/svg-icon.component";
import {FlatTreeControl} from "@angular/cdk/tree";
import {NzTreeFlatDataSource, NzTreeFlattener, NzTreeViewModule} from "ng-zorro-antd/tree-view";


/**
 * Un nœud de l'arborescence : soit un menu (rubrique ou page), soit une action
 * associée à une page. Les actions sont les feuilles, sous leur menu.
 */
interface AssocTreeNode {
    key: string;
    titre: string;
    type: 'menu' | 'assoc';
    path?: string;
    icon?: string;
    nbActions?: number;
    ligne?: any;            // la ligne d'association, pour les feuilles
    children?: AssocTreeNode[];
}

interface AssocFlatNode {
    expandable: boolean;
    level: number;
    key: string;
    titre: string;
    type: 'menu' | 'assoc';
    path?: string;
    icon?: string;
    nbActions?: number;
    ligne?: any;
}


@Component({
    selector: 'app-type-objet-menu',
    imports: [
        CommonModule,
        CardComponent,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        NzTreeViewModule,
        FormsModule, FeatherIconComponent, SvgIconComponent, AssocModalComponent],
    templateUrl: './type-objet-menu.component.html',
    styleUrl: './type-objet-menu.component.scss',
})
export class TypeObjetMenuComponent implements OnInit, AfterViewInit {
    dataLigne: any = {};
    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;

    searchValue = '';

    // ── Données ──────────────────────────────────────────────
    /** Les associations telles que renvoyées par l'API, à plat. */
    private dataAssoc: any[] = [];
    /** L'arbre des menus brut (auth/:menu), qui porte la hiérarchie. */
    private arbreMenus: any[] = [];

    /** Options des listes déroulantes du modal */
    menuNodes: any[] = [];          // arbre des menus (NzTreeNodeOptions)
    menuExpandedKeys: string[] = [];
    typeObjetOptions: any[] = [];   // { uid, lib_type_objet, code_type_objet }

    // ── Arborescence affichée (même mécanique que menu/onglet) ─
    private transformer = (node: AssocTreeNode, level: number): AssocFlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        level,
        key: node.key,
        titre: node.titre,
        type: node.type,
        path: node.path,
        icon: node.icon,
        nbActions: node.nbActions,
        ligne: node.ligne,
    });

    treeControl = new FlatTreeControl<AssocFlatNode>(
        node => node.level,
        node => node.expandable
    );

    treeFlattener = new NzTreeFlattener<AssocTreeNode, AssocFlatNode>(
        this.transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );

    dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);

    readonly hasChild = (_: number, node: AssocFlatNode): boolean => node.expandable;

    /** Nombre d'associations affichées (après recherche). */
    nbAffichees = 0;

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

    constructor(private autor: Authorization, private httService: HttpService, private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showAssociations();
        this.showMenus();
        this.showTypesObjets();
    }

    private get idsociete(): string {
        return this.users?.datasociete?.uid || this.users?.uidsociete || '';
    }

    // ── Liste des associations ────────────────────────────────
    showAssociations() {
        this.isloading = true;
        this.dataAssoc = [];
        this.httService.getData(
            `${environment.api_url}auth/:type-objets-menus?idsociete=${this.idsociete}&idmenu=&idtypeobjet=`,
            false,
            this.users?.access_token || ''
        )
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    this.dataAssoc = (res.body.data || []).map((e: any) => this.mapRow(e));
                    this.construireArbre();
                }
            })
            .catch((err) => {
                this.isloading = false;
                this.errorTexte = err?.error?.err?.message || "Une erreur est survenue !";
            });
    }

    /** Aplatit les variantes de nommage possibles de la réponse. */
    private mapRow(e: any) {
        const menu = e?.menu || {};
        const typeObjet = e?.typeobjet || e?.type_objet || {};
        return {
            ...e,
            uid: e?.uid || e?.uidtypeobjetmenu || e?.id,
            uidmenu: e?.uidmenu || e?.idmenu || menu?.uid || '',
            uidtypeobjet: e?.uidtypeobjet || e?.idtypeobjet || typeObjet?.uid || '',
            menu_title: e?.title || e?.lib_menu || menu?.title || '',
            menu_path: e?.path || menu?.path || '',
            lib_type_objet: e?.lib_type_objet || typeObjet?.lib_type_objet || '',
            code_type_objet: e?.code_type_objet || typeObjet?.code_type_objet || '',
            visible: e?.visible ?? e?.actif ?? true,
            cree: e?.created_at ? moment(e.created_at).format('DD-MM-YYYY') : '',
        };
    }

    // ── Options du modal ──────────────────────────────────────
    showMenus() {
        this.httService.getData(`${environment.api_url}auth/:menu?idsociete=${this.idsociete}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.arbreMenus = res.body.data || [];
                    this.menuNodes = this.mapMenusToNodes(this.arbreMenus);
                    // arbre replié à l'ouverture du modal : on déplie au clic sur la flèche
                    this.menuExpandedKeys = [];
                    this.construireArbre();
                }
            })
            .catch(() => {
            });
    }

    /**
     * Transforme l'arbre de l'API en noeuds pour le `nz-tree-select`.
     * Un menu qui a des sous-menus n'est qu'un regroupement de la sidebar : il ne
     * correspond à aucune page, donc il reste dépliable mais non sélectionnable.
     */
    private mapMenusToNodes(nodes: any[]): any[] {
        return nodes.map((n: any) => {
            const enfants = n.children?.length ? this.mapMenusToNodes(n.children) : [];
            return {
                title: n.title,
                key: n.uid,
                icon: n.icon,
                path: n.path || '',
                isLeaf: enfants.length === 0,
                selectable: enfants.length === 0,
                children: enfants,
            };
        });
    }

    showTypesObjets() {
        this.httService.getData(`${environment.api_url}auth/:types-objets?idsociete=${this.idsociete}&idtypeobjet=`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                if (res.body.status || res.body.success) {
                    this.typeObjetOptions = (res.body.data || []).map((e: any) => ({
                        uid: e?.uid || e?.idtypeobjet || e?.id,
                        lib_type_objet: e?.lib_type_objet || '',
                        code_type_objet: e?.code_type_objet || '',
                    }));
                }
            })
            .catch(() => {
            });
    }

    // ── Arborescence ─────────────────────────────────────────

    /**
     * Construit l'arbre affiché : la hiérarchie des menus (comme menu/onglet),
     * et sous chaque page les actions qui lui sont associées, en feuilles. Un
     * menu n'est gardé que s'il porte des actions, lui-même ou par un de ses
     * sous-menus — sinon la liste se remplirait de branches vides.
     */
    private construireArbre(): void {
        const q = this.searchValue.trim().toLowerCase();

        const correspond = (ligne: any): boolean => !q
            || [ligne.menu_title, ligne.menu_path, ligne.lib_type_objet, ligne.code_type_objet, ligne.cree]
                .some(v => String(v ?? '').toLowerCase().includes(q));

        const retenues = this.dataAssoc.filter(correspond);
        this.nbAffichees = retenues.length;

        // uid du menu -> ses associations
        const parMenu = new Map<string, any[]>();
        retenues.forEach(l => {
            if (!l.uidmenu) return;
            if (!parMenu.has(l.uidmenu)) parMenu.set(l.uidmenu, []);
            parMenu.get(l.uidmenu)!.push(l);
        });

        const construire = (noeuds: any[]): AssocTreeNode[] => {
            const out: AssocTreeNode[] = [];
            for (const n of noeuds || []) {
                const sousMenus = construire(n.children || []);
                const actions = (parMenu.get(n.uid) || []).map((l: any) => ({
                    key: l.uid,
                    titre: l.lib_type_objet || l.code_type_objet || '—',
                    type: 'assoc' as const,
                    ligne: l,
                }));
                if (!sousMenus.length && !actions.length) continue;   // branche vide

                out.push({
                    key: n.uid,
                    titre: n.title,
                    type: 'menu',
                    path: n.path || '',
                    icon: n.icon || '',
                    nbActions: actions.length,
                    children: [...actions, ...sousMenus],
                });
            }
            return out;
        };

        const arbre = construire(this.arbreMenus);

        // Les associations dont le menu n'est pas (ou plus) dans l'arbre ne
        // doivent pas disparaître silencieusement : on les regroupe à part.
        const connus = new Set<string>();
        const marquer = (l: AssocTreeNode[]) => l.forEach(n => {
            if (n.type === 'assoc') connus.add(n.key);
            marquer(n.children || []);
        });
        marquer(arbre);

        const orphelines = retenues.filter(l => !connus.has(l.uid));
        if (orphelines.length) {
            arbre.push({
                key: '__orphelines__',
                titre: 'Menus introuvables',
                type: 'menu',
                path: '',
                nbActions: orphelines.length,
                children: orphelines.map(l => ({
                    key: l.uid,
                    titre: l.lib_type_objet || l.code_type_objet || '—',
                    type: 'assoc' as const,
                    ligne: l,
                })),
            });
        }

        this.dataSource.setData(arbre);
        // Arbre replié par défaut, sauf le premier menu : on voit tout de suite à
        // quoi ressemble une branche sans avoir à cliquer. Pendant une recherche
        // on déplie tout, sinon les résultats resteraient cachés sous leur menu.
        this.treeControl.collapseAll();
        if (q) {
            this.treeControl.expandAll();
        } else {
            const premier = this.treeControl.dataNodes?.find(n => n.level === 0 && n.expandable);
            if (premier) {
                this.treeControl.expand(premier);
            }
        }
        setTimeout(() => this.syncHScroll());
    }

    /**
     * Déplie / replie un menu. Câblée sur toute la ligne, et pas seulement sur
     * la flèche : viser une icône de 14px demandait plusieurs essais.
     */
    basculerNoeud(node: any): void {
        if (node?.expandable) {
            this.treeControl.toggle(node);
        }
    }

    // ── Recherche globale ─────────────────────────────────────
    onSearch(_value?: string): void {
        this.construireArbre();
    }

    // ── Surlignage des occurrences recherchées ────────────────
    highlightMatch(text: string, search: string): SafeHtml {
        if (!search || !text) return text;
        const regex = new RegExp(`(${search})`, 'gi');
        const highlighted = text.replace(
            regex,
            '<mark style="background:#FEF08A;color:#713F12;border-radius:2px;padding:0 2px">$1</mark>'
        );
        return this.sanitizer.bypassSecurityTrustHtml(highlighted);
    }

    // ── Modal ─────────────────────────────────────────────────
    openModal(e?: any) {
        this.modalOpen = true;
        this.dataLigne = e || {};
    }

    handleModal(value: boolean) {
        if (value) {
            this.showAssociations();
        }
        this.modalOpen = false;
    }

    // ── Activer / désactiver (action 4) ───────────────────────
    toggleVisible(row: any) {
        this.sendAction(TypeObjetMenuAction.ActiverDesactiver, {
            uidtypeobjetmenu: row?.uid || '',
        }, row?.visible ? 'Association désactivée' : 'Association activée');
    }

    // ── Suppression (action 3) ────────────────────────────────
    async deleteAssociation(row: any) {
        const result = await Swal.fire({
            html: `
      <div style="margin-top: 8px;">
        <p style="font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 10px;">
          Êtes-vous sûr de vouloir supprimer cette association ?
        </p>
        <p style="font-size: 13px; color: #64748B; margin: 0;">
          L'action (${row?.lib_type_objet || ''}) sera retirée du menu (${row?.menu_title || ''}).
        </p>
      </div>
    `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
            customClass: {
                popup: 'swal-custom-popup',
                confirmButton: 'swal-custom-confirm',
                cancelButton: 'swal-custom-cancel',
            },
        });

        if (!result.isConfirmed) {
            return;
        }

        this.sendAction(TypeObjetMenuAction.Supprimer, {
            uidtypeobjetmenu: row?.uid || '',
        }, 'Association supprimée');
    }

    /**
     * Unique point d'appel de `auth/:type-objets-menus` depuis la liste.
     * `action` est toujours passé par l'appelant (3 = supprimer, 4 = activer/désactiver) ;
     * la création (1) et la modification (2) partent du modal.
     */
    private sendAction(action: TypeObjetMenuAction, data: any, messageParDefaut: string) {
        const payload = {
            action,
            idsociete: this.idsociete,
            ...data,
        };

        this.isloading = true;
        this.httService.postData(`${environment.api_url}auth/:type-objets-menus`, payload, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;
                if (res.body.status || res.body.success) {
                    Swal.fire({
                        title: res?.body?.message || messageParDefaut,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    this.showAssociations();
                }
            })
            .catch((err) => {
                this.isloading = false;
                Swal.fire({
                    title: err?.error?.err?.message || "Une erreur est survenue !",
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
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
