import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
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
    styleUrl: './sidebar.component.scss'
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

        this.items.subscribe(menuItems => {
            this.menuItems = menuItems;
        });

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
