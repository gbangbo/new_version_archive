import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CarouselModule, OwlOptions} from 'ngx-owl-carousel-o';
import moment from 'moment';

import {CardComponent} from '../../../../../shared/components/ui/card/card.component';
import {SvgIconComponent} from '../../../../../shared/components/ui/svg-icon/svg-icon.component';
import {FeatherIconComponent} from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import {Authorization} from '../../../../../protect/authorization.service';
import {HttpService} from '../../../../../core/http.service';
import {environment} from '../../../../../../environments/environment';

const MAX_CHARS = 120;

interface FlashItem {
    id: number;
    title: string;
    description: string;
    date_debut: string;
    date_fin: string;
}

@Component({
    selector: 'app-live-auction',
    imports: [CommonModule, CarouselModule, RouterModule, CardComponent, SvgIconComponent, FeatherIconComponent],
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
            850: {items: 3},
            1094: {items: 4}
        }
    };

    /* ── Position du carousel (pour activer/désactiver les flèches) ── */
    public atStart = true;
    public atEnd = false;

    constructor(private autor: Authorization, private httService: HttpService) {
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
                if (res.body.status || res.body.success) {
                    const fmt = (d: any) => d ? moment(d).format('DD/MM/YYYY') : '';
                    this.liveAuction = (res.body.data || [])
                        .filter((e: any) => (e?.actif ?? e?.active ?? e?.is_active ?? true))
                        .map((e: any, index: number) => ({
                            id: e?.id ?? index,
                            title: e?.lib_flashinfo || e?.libflashinfo || '',
                            description: e?.desc_flashinfo || e?.lib_flashinfo || e?.libflashinfo || '',
                            date_debut: fmt(e?.date_debut || e?.date_debut_flashinfo),
                            date_fin: fmt(e?.date_fin || e?.date_fin_flashinfo),
                        }));
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
        this.atStart = start <= 0;
        this.atEnd = start + visible >= total;
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

    getDescription(item: any): string {
        const desc: string = item.description ?? '';
        if (this.isExpanded(item.id) || desc.length <= this.maxChars) return desc;
        return desc.slice(0, this.maxChars).trimEnd() + '…';
    }

    needsExpand(item: any): boolean {
        return (item.description ?? '').length > this.maxChars;
    }

    isSameDay(debut?: string, fin?: string): boolean {
        return !!debut && debut === fin;
    }
}
