import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter, map, Subscription} from 'rxjs';

import {LoaderComponent} from "./shared/components/ui/loader/loader.component";
// import {BackToTopComponent} from "./shared/components/ui/back-to-top/back-to-top.component";
import {LayoutService} from './shared/services/layout.service';
import {SessionExpiredModalComponent} from "./components/session-expired-modal/session-expired-modal.component";
import {HttpService} from "./core/http.service";
import {Authorization} from "./protect/authorization.service";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoaderComponent, /* BackToTopComponent, */ SessionExpiredModalComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
    showSessionModal: boolean = false;
    private sub!: Subscription;
    msgCnx: string = '';

    // Icone d'onglet : logo de la societe connectee, marque APW tant qu'il n'y en a pas
    private readonly FAVICON_PAR_DEFAUT = 'assets/images/logo/logo-icon.png';
    // Logos dont l'URL ne repond pas : inutile de les retenter a chaque navigation
    private logosEnEchec = new Set<string>();

    constructor(public layoutService: LayoutService,
                private router: Router,
                private titleService: Title,
                private httService: HttpService,
                private autor: Authorization,
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
        this.majFavicon();
        setTimeout(() => this.majFavicon(), 2000);
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
                this.majFavicon();
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    closeSessionModal(): void {
        this.showSessionModal = false;
    }

    // Le logo de la societe remplace l'icone d'onglet. On le charge d'abord hors page :
    // une URL cassee (fichier absent, hote en http sur une page en https) laisserait
    // sinon l'onglet sans icone du tout.
    private majFavicon(): void {
        const logoSession = this.autor.getInfosUsers()?.datasociete?.logo || '';
        const cible = (logoSession && !this.logosEnEchec.has(logoSession)) ? logoSession : this.FAVICON_PAR_DEFAUT;

        // On se compare au DOM et non a une variable : en developpement, le serveur
        // Angular pose sa propre icone apres le demarrage et ecrase la notre.
        const lien = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
        if ((lien?.getAttribute('href') || '') === cible) {
            return;
        }

        if (cible === this.FAVICON_PAR_DEFAUT) {
            this.poserFavicon(cible);
            return;
        }

        const test = new Image();
        test.onload = () => this.poserFavicon(cible);
        test.onerror = () => {
            this.logosEnEchec.add(cible);
            this.poserFavicon(this.FAVICON_PAR_DEFAUT);
        };
        test.src = cible;
    }

    private poserFavicon(href: string): void {
        let lien = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
        if (!lien) {
            lien = document.createElement('link');
            lien.rel = 'icon';
            document.head.appendChild(lien);
        }
        lien.removeAttribute('type');
        lien.href = href;
    }
}
