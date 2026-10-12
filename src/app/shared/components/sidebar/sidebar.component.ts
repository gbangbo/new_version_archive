import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

import {LogoComponent} from "../header/widgets/logo/logo.component";
import {FeatherIconComponent} from "../ui/feather-icon/feather-icon.component";
import {SvgIconComponent} from "../ui/svg-icon/svg-icon.component";
import {items, menuItems} from '../../data/menu';
import {Menu} from '../../interface/menu';
import {LayoutService} from '../../services/layout.service';
import {Authorization} from "../../../protect/authorization.service";

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, RouterModule, TranslatePipe,
        LogoComponent, FeatherIconComponent, SvgIconComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    animations: [
        trigger('collapse', [
            state('closed', style({height: '0', opacity: 0, paddingTop: 0, paddingBottom: 0})),
            state('open', style({height: '*', opacity: 1, paddingTop: '*', paddingBottom: '*'})),
            transition('open <=> closed', [
                style({overflow: 'hidden'}),
                animate('280ms cubic-bezier(0.4, 0, 0.2, 1)')
            ])
        ])
    ]
})

export class SidebarComponent {

    public menuItems = menuItems;
    public items = items;
    public leftArrow: boolean = false;
    public rightArrow: boolean = true;
    public pinedItem: Menu[] = [];
    public users: any = [];

    constructor(private autor: Authorization, private router: Router, public layoutService: LayoutService) {
        this.users = this.autor.getInfosUsers();

        // ── Menu statique (shared/data/menu.ts) ───────────────────────────
        // Conservé tel quel : il suffit de décommenter ces trois lignes et de
        // neutraliser l'appel à chargerMenuDynamique() pour y revenir.
        // this.items.subscribe(menuItems => {
        //     this.menuItems = menuItems;
        // });

        // ── Menu dynamique (users._menu, renvoyé par auth/:rolemenu) ──────
        this.chargerMenuDynamique();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const urlTree = this.router.parseUrl(event.url);
                const cleanPath = '/' + urlTree.root.children['primary']?.segments.map(s => s.path).join('/');

                this.menuItems.forEach(item => {
                    if (item.path === cleanPath) {
                        this.setNavActive(item);
                        return;
                    }
                    if (!item.children) return;
                    item.children.forEach(sub => {
                        if (sub.path === cleanPath) {
                            this.setNavActive(sub);
                            return;
                        }
                        if (!sub.children) return;
                        sub.children.forEach(subSub => {
                            if (subSub.path === cleanPath) this.setNavActive(subSub);
                        });
                    });
                });
            }
        });
    }

    // ══ MENU DYNAMIQUE ══════════════════════════════════════════════════
    /**
     * Remplace les entrées statiques par celles du profil connecté.
     * Si la session n'en porte aucune (session ouverte avant cette version,
     * appel `rolemenu` en échec), on garde le menu statique : une barre vide
     * rendrait l'application inutilisable.
     */
    private chargerMenuDynamique(): void {
        const dynamique = this.construireMenu(this.users?._menu);
        if (!dynamique.length) return;

        this.menuItems = this.regrouperParSection(dynamique);
    }

    /**
     * Les en-têtes de rubrique (APPLICATIONS, GEC, RH, ACTUALITÉ, …) ne sont
     * pas renvoyés par l'API : on les reprend de shared/data/menu.ts, qui sert
     * de référence de découpage, et on n'affiche que ceux dont au moins une
     * entrée figure dans le menu du rôle. L'ordre des rubriques est celui du
     * gabarit ; à l'intérieur, l'ordre reste celui du `rang` de l'API.
     */
    private regrouperParSection(dynamique: Menu[]): Menu[] {
        // Découpage du gabarit : un en-tête, puis les clés de ses entrées.
        const sections: { entete: Menu; cles: Set<string> }[] = [];

        for (const item of menuItems) {
            if (item.main_title) {
                sections.push({entete: item, cles: new Set<string>()});
                continue;
            }
            const section = sections[sections.length - 1];
            if (!section) continue;
            this.clesDe(item).forEach(c => section.cles.add(c));
        }

        const restants = [...dynamique];
        const groupes = sections.map(section => {
            const entrees = restants.filter(m => this.clesDe(m).some(c => section.cles.has(c)));
            entrees.forEach(m => restants.splice(restants.indexOf(m), 1));
            return {entete: section.entete, entrees};
        });

        // Une entrée que le gabarit ne connaît pas encore rejoint la première
        // rubrique : la laisser en fin de liste l'afficherait sous le dernier
        // en-tête rendu, donc sous une rubrique qui ne la concerne pas.
        if (restants.length && groupes.length) {
            groupes[0].entrees.push(...restants);
        }

        const resultat: Menu[] = [];
        groupes.forEach(g => {
            if (g.entrees.length) resultat.push(g.entete, ...g.entrees);
        });

        // Gabarit sans aucun en-tête : on rend le menu du rôle tel quel.
        return resultat.length ? resultat : dynamique;
    }

    /**
     * Clés de rapprochement d'une entrée entre gabarit et API : son titre et
     * les chemins de toute sa branche. Le titre suffit pour les regroupements
     * (« Documents », « Importer ») qui n'ont pas de route propre, les chemins
     * couvrent le cas où un libellé aurait été retouché côté back-office.
     */
    private clesDe(item: Menu): string[] {
        const cles: string[] = [];
        if (item.title) cles.push('t:' + item.title.trim().toLowerCase());

        const parcourir = (noeuds?: Menu[]): void => {
            (noeuds || []).forEach(e => {
                if (e.path) cles.push('p:' + e.path);
                parcourir(e.children);
            });
        };
        if (item.path) cles.push('p:' + item.path);
        parcourir(item.children);

        return cles;
    }

    /**
     * Convertit l'arbre de `auth/:rolemenu` vers l'interface Menu du template.
     *
     * Correspondances : title/path/icon sont repris tels quels (les noms
     * d'icônes de l'API — home, widget, document, import — sont déjà ceux du
     * sprite SVG) ; `type` est déduit de la présence d'enfants plutôt que de
     * `iconType`, que l'API renseigne à « sub » même sur les feuilles ; le
     * `level` repart à 1 côté template alors que l'API le compte à partir de 0.
     * Le tri par `rang` est refait ici car il est propre à chaque niveau.
     */
    private construireMenu(noeuds: any[], niveau: number = 1): Menu[] {
        return [...(noeuds || [])]
            .filter((n: any) => n?.actif !== false)
            .sort((a: any, b: any) => (a?.rang ?? 0) - (b?.rang ?? 0))
            .map((n: any) => {
                const enfants = this.construireMenu(n?.children, niveau + 1);
                return {
                    title: n?.title || '',
                    id: n?.uid || '',
                    icon: n?.icon || undefined,
                    path: n?.path || undefined,
                    type: enfants.length ? 'sub' : 'link',
                    level: niveau,
                    active: false,
                    children: enfants.length ? enfants : undefined,
                } as Menu;
            });
    }

    // En layout horizontal les sous-menus s'ouvrent au survol via CSS :
    // on laisse le display faire le travail et on desactive l'animation de hauteur.
    get isHorizontal(): boolean {
        return this.layoutService.config.settings.sidebar_type.includes('horizontal');
    }

    setNavActive(items: Menu) {
        this.menuItems.filter(menuItem => {
            if (menuItem !== items) {
                menuItem.active = false;
            } else {
                menuItem.active = true;
                setTimeout(() => {
                    this.scroll(items)
                }, 2000);
            }


            if (menuItem.children && menuItem.children.includes(items)) {
                menuItem.active = true;
                setTimeout(() => {
                    this.scroll(menuItem)
                }, 2000);
            }

            if (menuItem.children) {
                menuItem.children.filter(submenuItems => {
                    if (submenuItems.children && submenuItems.children.includes(items)) {
                        menuItem.active = true;
                        submenuItems.active = true;
                        setTimeout(() => {
                            this.scroll(menuItem)
                        }, 2000);
                    }
                });
            }
        });
    }

    toggleMenu(item: Menu) {
        // Un menu dépliant déjà ouvert se referme au second clic
        if (item.active && item.children?.length) {
            item.active = false;
            return;
        }

        if (item.active) return;

        this.menuItems.forEach((menu) => {
            if (this.menuItems.includes(item)) {
                menu.active = false;
            }
            if (!menu.children) return;

            menu.children.forEach((subMenu) => {
                if (menu.children?.includes(item)) {
                    subMenu.active = false;
                }
                if (subMenu.children) {
                    subMenu.children.forEach((detail) => {
                        if (subMenu.children?.includes(item)) {
                            detail.active = false;
                        }
                    });
                }
            });
        });

        item.active = true;
    }

    scrollLeft() {
        this.rightArrow = true;
        if (this.layoutService.margin != 0) {
            this.layoutService.margin = this.layoutService.margin + 500;
        }

        if (this.layoutService.margin == 0) {
            this.leftArrow = false;
        }
    }

    scrollRight() {
        this.leftArrow = true;
        if (this.layoutService.margin != this.layoutService.scrollMargin) {
            this.layoutService.margin = this.layoutService.margin - 500;
        }
        if (this.layoutService.margin == this.layoutService.scrollMargin) {
            this.rightArrow = false;
        }
    }

    closeSidebar() {
        this.layoutService.closeSidebar = true;
    }

    pined(item: Menu) {
        if (!item.pined) {
            this.menuItems.filter((details) => {
                if (details.title) {
                    if (this.menuItems.includes(item)) {
                        item.pined = true;
                        if (!this.pinedItem.includes(item)) {
                            this.pinedItem.push(item);
                        }
                    }
                }
            })
        } else {
            item.pined = false;
            this.pinedItem.splice(this.pinedItem.indexOf(item), 1)
        }

        this.scroll(item)
    }

    scroll(item: Menu) {
        if (item && item.id) {
            const scrollDiv = document.getElementById(item.id);
            if (scrollDiv) {
                setTimeout(() => {
                    scrollDiv.scrollIntoView({behavior: 'smooth', block: 'start'})
                }, 100);
            }
        }
    }

}
