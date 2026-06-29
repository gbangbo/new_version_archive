import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from '../../../../../shared/components/ui/svg-icon/svg-icon.component';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { liveAuction } from '../../../../../shared/data/dashboard/nft';

const MAX_CHARS = 120;

@Component({
  selector: 'app-live-auction',
  imports: [CommonModule, CarouselModule, RouterModule, CardComponent, SvgIconComponent, FeatherIconComponent],
  templateUrl: './live-auction.component.html',
  styleUrl: './live-auction.component.scss'
})
export class LiveAuctionComponent implements OnInit, OnDestroy {

  public liveAuction = liveAuction;
  public maxChars = MAX_CHARS;
  public expandedIds = new Set<number>();
  public isloading = true;

  public options: OwlOptions = {
    loop: false,
    dots: false,
    nav: true,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    autoplay: true,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    lazyLoad: true,
    margin: 0,
    responsive: {
      0: { items: 1 },
      416: { items: 2 },
      850: { items: 3 },
      1094: { items: 4 }
    }
  }

  public auctionInterval: any;
  public currentDateTime: Date = new Date();

  ngOnInit() {
    setTimeout(() => {
      this.isloading = false;
      this.startAuctionTimers();
    }, 1500);
  }

  startAuctionTimers() {
    this.auctionInterval = setInterval(() => {
      this.currentDateTime = new Date();
      this.updateAuctionTimers();
    }, 1000);
  }

  updateAuctionTimers() {
    this.liveAuction.forEach(bid => {
      const auctionEndDate = new Date(bid.auction_date);
      const timeDifference = auctionEndDate.getTime() - this.currentDateTime.getTime();

      if (timeDifference <= 0) {
        bid.remaining_time = '0:00:00';
      } else {
        const secondsInDay = 24 * 60 * 60;
        const secondsInHour = 60 * 60;
        const secondsInMinute = 60;

        const days    = Math.floor(timeDifference / (secondsInDay * 1000));
        const hours   = Math.floor((timeDifference % (secondsInDay * 1000)) / (secondsInHour * 1000));
        const minutes = Math.floor((timeDifference % (secondsInHour * 1000)) / (secondsInMinute * 1000));
        const seconds = Math.floor((timeDifference % (secondsInMinute * 1000)) / 1000);

        bid.remaining_time = `${days}:${hours}:${minutes}:${seconds}`;
      }
    });
  }

  ngOnDestroy() {
    if (this.auctionInterval) {
      clearInterval(this.auctionInterval);
    }
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
