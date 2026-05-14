import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter, map, Subscription} from 'rxjs';

import {LoaderComponent} from "./shared/components/ui/loader/loader.component";
import {BackToTopComponent} from "./shared/components/ui/back-to-top/back-to-top.component";
import {LayoutService} from './shared/services/layout.service';
import {SessionExpiredModalComponent} from "./components/session-expired-modal/session-expired-modal.component";
import {HttpService} from "./core/http.service";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoaderComponent, BackToTopComponent, SessionExpiredModalComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
    showSessionModal: boolean = false;
    private sub!: Subscription;
    msgCnx: string = '';

    constructor(public layoutService: LayoutService,
                private router: Router,
                private titleService: Title,
                private httService: HttpService,
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
        this.sub = this.httService.sessionExpired$.subscribe((data: any) => {
            if (data.code) {
                this.msgCnx = '';
            } else {
                this.msgCnx = data?.detail || '';
            }

            this.showSessionModal = true;
        });
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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    closeSessionModal(): void {
        this.showSessionModal = false;
    }
}
