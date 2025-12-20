import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { LoaderComponent } from "./shared/components/ui/loader/loader.component";
import { BackToTopComponent } from "./shared/components/ui/back-to-top/back-to-top.component";
import { LayoutService } from './shared/services/layout.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoaderComponent,BackToTopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  constructor(public layoutService: LayoutService, 
    private router: Router, 
    private titleService: Title, 
    private activatedRoute: ActivatedRoute) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 800); 
        }
      });
    }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }
  
          const pageTitle = route?.snapshot.data['pageTitle'] || route?.snapshot.data['title'];
          return pageTitle ? `${pageTitle} | Archive Web Pro` : 'Archive Web Pro';
        })
      )
      .subscribe(title => {
        this.titleService.setTitle(title);
      });
  }
  
}
