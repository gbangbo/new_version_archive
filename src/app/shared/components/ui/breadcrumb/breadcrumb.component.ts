import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';

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
      });
  }
  
}
