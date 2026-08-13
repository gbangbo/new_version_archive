import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';

import { menuItems } from '../../../data/menu';
import { Menu } from '../../../interface/menu';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterModule, SvgIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})

export class BreadcrumbComponent {

  public title: string;
  public breadcrumbs: {
    parentBreadcrumb?: string;
    childBreadcrumb?: string;
  } = {};

  // Icône reprise du menu latéral pour la page courante (sprite assets/svg/icon-sprite.svg)
  public menuIcon: string = 'home';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary')
      )
      .subscribe(route => {
        const routeSnapshot = route.snapshot;

        this.breadcrumbs = {
          parentBreadcrumb: route.parent?.snapshot.data['breadcrumb'] || '',
          childBreadcrumb: routeSnapshot.data['breadcrumb'] || '',
        };

        this.title = routeSnapshot.data['title'] || '';
        this.menuIcon = this.resolveMenuIcon(this.router.url);
      });
  }

  /**
   * Retrouve dans `menuItems` (menu latéral) l'icône correspondant à l'URL courante.
   * Un sous-menu hérite de l'icône de son parent, comme dans la sidebar.
   */
  private resolveMenuIcon(url: string): string {
    const currentPath = this.normalize(url);
    let bestIcon = '';
    let bestLength = -1;

    const walk = (items: Menu[], inheritedIcon?: string): void => {
      for (const item of items) {
        const icon = item.icon || inheritedIcon;

        if (item.path && icon) {
          const path = this.normalize(item.path);
          // On garde le chemin le plus précis (le plus long) qui correspond
          if (path && (currentPath === path || currentPath.startsWith(path + '/')) && path.length > bestLength) {
            bestIcon = icon;
            bestLength = path.length;
          }
        }

        if (item.children?.length) {
          walk(item.children, icon);
        }
      }
    };

    walk(menuItems);

    return bestIcon || 'home';
  }

  private normalize(path: string): string {
    return path.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');
  }

}
