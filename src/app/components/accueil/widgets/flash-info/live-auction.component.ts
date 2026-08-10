import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {CarouselModule, CarouselComponent, OwlOptions} from 'ngx-owl-carousel-o';
import moment from 'moment';
import 'moment/locale/fr';

import {CardComponent} from '../../../../shared/components/ui/card/card.component';
import {FeatherIconComponent} from '../../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../../protect/authorization.service';
import {HttpService} from '../../../../core/http.service';
import {environment} from '../../../../../environments/environment';

const MAX_CHARS = 120;

interface FlashItem {
    id: number;
    title: string;
    description: SafeHtml;  // HTML sécurisé (rendu via [innerHTML], couleurs conservées)
    descText: string;      // texte brut (détection « Lire la suite »)
    date_debut: string;
    date_fin: string;
    periode: string;   // libellé prêt à afficher : « du 02 août → 15 août 2026 »
}

@Component({
    selector: 'app-live-auction',
    imports: [CommonModule, CarouselModule, RouterModule, CardComponent, FeatherIconComponent],
    templateUrl: './live-auction.component.html',
    styleUrl: './live-auction.component.scss'
})
export class LiveAuctionComponent implements OnInit {

    public liveAuction: FlashItem[] = [];
    public maxChars = MAX_CHARS;
    public expandedIds = new Set<number>();
    public isloading = true;

    private users: any = [];

    public options: OwlOptions = {
        loop: false,
        dots: false,
        nav: false,
        navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
        autoplay: true,
        autoplaySpeed: 2000,
        autoplayHoverPause: true,
        lazyLoad: true,
        margin: 0,
        responsive: {
            0: {items: 1},
            416: {items: 2},
            850: {items: 3}
        }
    };

    /* ── Position du carousel (pour activer/désactiver les flèches) ── */
    public atStart = true;
    public atEnd = false;

    @ViewChild('owlCar') owlCar?: CarouselComponent;

    constructor(private autor: Authorization, private httService: HttpService, private sanitizer: DomSanitizer,
                private cdr: ChangeDetectorRef) {
    }

    owlPrev(): void {
        this.owlCar?.prev();
    }

    owlNext(): void {
        this.owlCar?.next();
    }

    ngOnInit(): void {
        this.users = this.autor.getInfosUsers();
        this.loadFlashInfos();
    }

    // ── Chargement des flash infos (actifs) ───────────────────────────
    private loadFlashInfos(): void {
        this.isloading = true;
        this.liveAuction = [];
        const id = this.users?.datasociete?.uid || '';
        this.httService.getData(
            `${environment.api_url}api/:save-flash-info?idflashinfo=&idsociete=${id}`,
            false,
            this.users?.access_token || ''
        ).toPromise()
            .then((res: any) => {
                this.isloading = false;
                console.log("flas ===", res.body.data)
                if (res.body.status || res.body.success) {
                    const fmt = (d: any) => d ? moment(d).locale('fr').format('DD MMMM YYYY') : '';
                    const today = moment().startOf('day');
                    this.liveAuction = (res.body.data || [])
                        .filter((e: any) => {
                            // On masque les flash inactifs
                            const isActive = (e?.active_flash ?? e?.actif ?? e?.active ?? e?.is_active ?? true);
                            // On masque les flash expirés (date de fin dépassée)
                            const end = e?.date_end || e?.date_fin || e?.date_fin_flashinfo;
                            const notExpired = !end || moment(end).endOf('day').isSameOrAfter(today);
                            return isActive && notExpired;
                        })
                        .map((e: any, index: number) => {
                            const rawStart = e?.date_start || e?.date_debut || e?.date_debut_flashinfo;
                            const rawEnd = e?.date_end || e?.date_fin || e?.date_fin_flashinfo;
                            const rawDesc = e?.desc_flashinfo || '';
                            const fallback = e?.lib_flashinfo || e?.libflashinfo || '';
                            return {
                                id: e?.id ?? index,
                                title: e?.lib_flashinfo || e?.libflashinfo || '',
                                description: this.sanitizer.bypassSecurityTrustHtml(rawDesc || fallback),
                                descText: this.stripHtml(rawDesc) || fallback,
                                date_debut: fmt(rawStart),
                                date_fin: fmt(rawEnd),
                                periode: this.buildPeriode(rawStart, rawEnd),
                            };
                        });
                }
            })
            .catch(() => {
                this.isloading = false;
            });
    }

    onSlideChange(data: any): void {
        const start = data?.startPosition ?? 0;
        const visible = data?.slides?.length ?? 1;
        const total = this.liveAuction.length;
        // Différé hors du cycle de détection courant (les événements owl se
        // déclenchent pendant le CD) pour éviter NG0100.
        Promise.resolve().then(() => {
            this.atStart = start <= 0;
            this.atEnd = start + visible >= total;
            this.cdr.markForCheck();
        });
    }

    isExpanded(id: number): boolean {
        return this.expandedIds.has(id);
    }

    toggleExpand(id: number, event: Event): void {
        event.stopPropagation();
        if (this.expandedIds.has(id)) {
            this.expandedIds.delete(id);
        } else {
            this.expandedIds.add(id);
        }
    }

    needsExpand(item: any): boolean {
        return (item.descText ?? '').length > this.maxChars;
    }

    isSameDay(debut?: string, fin?: string): boolean {
        return !!debut && debut === fin;
    }

    /** Retire les balises HTML pour un aperçu texte propre dans le widget. */
    private stripHtml(html: any): string {
        return (html || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    /** Construit un libellé compact : « du 02 août → 15 août 2026 ». */
    private buildPeriode(rawStart: any, rawEnd: any): string {
        const mStart = rawStart ? moment(rawStart).locale('fr') : null;
        const mEnd = rawEnd ? moment(rawEnd).locale('fr') : null;

        if (mStart && mEnd) {
            if (mStart.isSame(mEnd, 'day')) {
                return `le ${mEnd.format('DD MMMM YYYY')}`;
            }
            // On n'affiche l'année sur le début que si elle diffère de la fin
            const startFmt = mStart.isSame(mEnd, 'year')
                ? mStart.format('DD MMMM')
                : mStart.format('DD MMMM YYYY');
            return `du ${startFmt} → ${mEnd.format('DD MMMM YYYY')}`;
        }
        if (mEnd) return `jusqu'au ${mEnd.format('DD MMMM YYYY')}`;
        if (mStart) return `à partir du ${mStart.format('DD MMMM YYYY')}`;
        return '';
    }
}
