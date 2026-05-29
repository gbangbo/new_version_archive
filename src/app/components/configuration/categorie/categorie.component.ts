import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../../../shared/components/ui/card/card.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Authorization} from "../../../protect/authorization.service";
import {HttpService} from "../../../core/http.service";
import {environment} from "../../../../environments/environment";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {FeatherIconComponent} from "../../../shared/components/ui/feather-icon/feather-icon.component";
import {SelectionModel} from "@angular/cdk/collections";
import {FlatTreeControl} from "@angular/cdk/tree";
import {getParent, NzTreeFlatDataSource, NzTreeFlattener, NzTreeViewModule} from "ng-zorro-antd/tree-view";
import {NzSplitterModule} from "ng-zorro-antd/splitter";
import {FlatNode, TreeNode} from "./tree-node.model";
import Swal from "sweetalert2";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {AddModalComponent} from "./add-modal/add-modal.component";


const TREE_DATA: TreeNode[] = [];

@Component({
    selector: 'app-categorie',
    imports: [
        CommonModule,
        CardComponent,
        NzTableModule,
        NzInputModule,
        NzIconModule,
        NzTagModule,
        NzTooltipDirective,
        FormsModule,
        FeatherIconComponent,
        NzTreeViewModule,
        NzSplitterModule,
        AddModalComponent
    ],
    templateUrl: './categorie.component.html',
    styleUrl: './categorie.component.scss',
})
export class CategorieComponent implements OnInit {
    dataSociete: any = [];
    dataLigne: any = [];
    private users: any = [];
    errorTexte: string = '';
    isloading: boolean = false;
    modalOpen: boolean = false;


    searchValue = '';

    // ── Données ──────────────────────────────────────────────

    filteredData: any = [];

    private dataBenef: any = [];


    /**
     *Systeme tree view
     */


    treeData: TreeNode[] = TREE_DATA;


    private transformer = (node: TreeNode, level: number): FlatNode => ({
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        name_categories: node.name_categories,
        code_categories: node.code_categories,
        actif: node.actif ?? true,
        position: node.position,
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
    private allData: any = [];

    readonly hasChild = (_: number, node: FlatNode): boolean => node.expandable;
// Dans le TypeScript, ajoutez cette condition
    hasNoChild = (_: number, node: FlatNode): boolean =>
        !node.expandable && node.level === 0;

// Par ceci, avec comparaison par key
    selectListSelection = new SelectionModel<FlatNode>(
        false,   // single select
        [],      // valeurs initiales
        true,    // emit changes
        (a, b) => a.key === b.key  // ← comparaison par uid, pas par référence
    );

    constructor(private autor: Authorization, private httService: HttpService, private sanitizer: DomSanitizer) {

    }


    ngOnInit(): void {
        window.scrollTo({top: 0, behavior: 'smooth'});
        this.users = this.autor.getInfosUsers();
        this.showCategorieClassement('', '', '');
    }

    showCategorieClassement(idsociete: string = '', idtype_document: string = '', idcategories: string = '') {
        this.isloading = true;
        this.dataBenef = [];
        this.httService.getData(`${environment.api_url}api/:save-categorie-plan-classement?idsociete=${idsociete}&idtype_document=${idtype_document}&idcategories=${idcategories}`, false, this.users?.access_token || '')
            .toPromise()
            .then((res: any) => {
                this.isloading = false;

                if (res.body.status || res.body.success) {
                    this.dataBenef = res.body.data.map((e: any) => {
                        return {
                            ...e
                        }
                    });

                    this.treeData = this.mapApiToTree(this.dataBenef);
                    this.dataSource.setData(this.treeData);
                    console.log("res.body.data", res.body.data)
                    console.log("this.dataSource===", this.treeData)

                }
            })
            .catch((err) => {
                this.isloading = false;
            });

    }

    handleAction(value: any) {
    }

    openModal(e?: any, sens?: string) {
        let parent: any = this.findParent(this.treeData, e.id);
        this.modalOpen = true;
        this.dataLigne = {
            ...e,
            sens: sens,
            parent: sens == 'a' ? e.key : (parent?.key || ''),
            idcategories: (sens == 'a' || sens == 'm') ? e.key : '',
        };
    }

    openToNew(row?: any) {
        this.modalOpen = true;
        this.dataLigne = row || {};
    }


    async deleteFolder(e?: any) {
        const isActif = e.actif;
        let parent: any = this.findParent(this.treeData, e.id);

        const result = await Swal.fire({
            html: `
      <div style="margin-top: 8px;">
        <p style="font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 10px;">
          Êtes-vous sûr de vouloir supprimer cette catégorie/sous-catégorie ?
        </p>
        <p style="font-size: 13px; color: #64748B; margin: 0;">
          La catégorie/sous-catégorie (${e.name}) sera supprimé de la liste.
        </p>
      </div>
    `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            confirmButtonColor: isActif ? '#EF4444' : '#10B981',
            cancelButtonColor: '#94A3B8',
            reverseButtons: true,
            customClass: {
                popup: 'swal-custom-popup',
                confirmButton: 'swal-custom-confirm',
                cancelButton: 'swal-custom-cancel',
            },
            didOpen: () => {
                const icon = document.querySelector('.swal2-icon.swal2-question') as HTMLElement;
                if (icon) {
                    const color = isActif ? 'rgb(179 179 179)' : 'rgb(179 179 179)';
                    icon.style.borderColor = color;
                    icon.style.color = color;
                    icon.style.borderWidth = '2px';
                    icon.style.width = '64px';
                    icon.style.height = '64px';

                    // ← ajout pour corriger la déformation du "?"
                    const content = icon.querySelector('.swal2-icon-content') as HTMLElement;
                    if (content) {
                        content.style.fontSize = '36px';
                        content.style.lineHeight = '1';
                    }
                }
            },
        });

        if (result.isConfirmed) {
            let payload = {
                "action": 3,
                "idcategories": e.key,
                "name_categories": e.name,
                "code_categories": e.code_categories || '',
                "idsociete": "",
                position: e.position,
                "actif": e.actif,
                "parent": parent?.key || '',
            }
            console.log("payload ===", payload)
            this.httService.postData(`${environment.api_url}api/:save-categorie-plan-classement`, payload, this.users?.access_token)
                .toPromise()
                .then((res: any) => {
                    if (res.body.status || res.body.success) {
                        this.showCategorieClassement('', '', '');
                        Swal.fire({
                            title: res?.body?.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                    } else {
                        Swal.fire({
                            title: res?.body?.message,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }
                })
                .catch((err) => {
                    console.log("err?.error ===", err?.error)
                    Swal.fire({
                        title: err?.error?.err?.message || 'Une erreur est survenue.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    })
                });
        }
    }


    handleModal(value: boolean) {
        if (value) {
            this.showCategorieClassement('', '', '');
        }
        this.modalOpen = false;
    }


    /**
     * Systeme tree view
     */

    mapApiToTree(data: any[]): TreeNode[] {
        return data.map(item => ({
            name: `${item.code_categories || ''} ${item.code_categories ? '-' : ''} ${item?.name_categories}`,
            key: item?.uid,
            name_categories: item?.name_categories,
            code_categories: item?.code_categories,
            id: item?.id,
            position: item?.lft,
            actif: true,
            apiLevel: item?.level,
            disabled: false,
            // children: item.children?.length > 0
            //     ? this.mapApiToTree(item.children)
            //     : undefined
        }));
    }

    onNodeSelect(node: FlatNode): void {
        // Si déjà sélectionné → désélectionner et revenir à tout
        if (this.selectListSelection.isSelected(node)) {
            this.selectListSelection.deselect(node);
            this.filteredData = this.allData;
            return;
        }

        // Désélectionner tout puis sélectionner le nœud cliqué
        this.selectListSelection.clear();
        this.selectListSelection.select(node);

        const treeNode: any = this.findNode(this.treeData, node.key);
        const rows = treeNode?.children?.length > 0
            ? treeNode.children
            : [treeNode];

        this.filteredData = rows
            .filter((n: any) => !!n)
            .map((n: any) => this.nodeToRow(n!));

        console.log(this.filteredData)
    }

// Convertit un TreeNode vers le format attendu par le tableau
    private nodeToRow(node: TreeNode): any {
        return {
            uid: node.key,
            position: node.position,
            actif: node.actif,
            apiLevel: node.apiLevel,
        };
    }

// Retrouve un TreeNode par uid (utile pour [class.op-row-selected])
    getNodeByUid(uid: any): TreeNode | undefined {
        return this.findNode(this.treeData, uid);
    }

    private findNode(nodes: TreeNode[], uid: string): TreeNode | undefined {
        for (const n of nodes) {
            if (n.key === uid) return n;
            if (n.children) {
                const found = this.findNode(n.children, uid);
                if (found) return found;
            }
        }
        return undefined;
    }

    isRowSelected(uid: string): boolean {
        const node: any = this.findNode(this.treeData, uid);
        return node ? this.selectListSelection.isSelected(node) : false;
    }

    onSearch(value: string): void {
        this.searchValue = value;
        if (!value || value.trim() === '') {
            // Réinitialiser — afficher tout
            this.dataSource.setData(this.treeData);
            // Ré-expand le premier nœud
            setTimeout(() => {
                const first = this.treeControl.dataNodes?.[0];
                if (first) this.treeControl.expand(first);
            }, 0);
            return;
        }
        const filtered = this.filterTree(this.treeData, value.toLowerCase());
        this.dataSource.setData(filtered);
        // Expand tout pour voir les résultats
        setTimeout(() => this.treeControl.expandAll(), 0);
    }

// Filtre récursif — garde un nœud si lui ou un de ses enfants correspond
    private filterTree(nodes: TreeNode[], search: string): TreeNode[] {
        const result: TreeNode[] = [];
        for (const node of nodes) {
            const matches = node.name?.toLowerCase().includes(search);
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

    findParent(nodes: any[], childId: number, parent: any = null): any {

        for (const node of nodes) {

            // enfant trouvé
            if (node.id === childId) {
                return parent;
            }

            // chercher dans les enfants
            if (node.children && node.children.length > 0) {

                const result = this.findParent(
                    node.children,
                    childId,
                    node
                );

                if (result) {
                    return result;
                }
            }
        }

        return null;
    }
}