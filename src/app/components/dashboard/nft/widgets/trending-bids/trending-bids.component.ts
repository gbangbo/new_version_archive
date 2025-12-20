import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { trendingBids } from '../../../../../shared/data/dashboard/nft';

@Component({
  selector: 'app-trending-bids',
  imports: [CommonModule, CarouselModule, RouterModule, CardComponent],
  templateUrl: './trending-bids.component.html',
  styleUrl: './trending-bids.component.scss'
})

export class TrendingBidsComponent {

  public trendingBids = trendingBids;
  public options: OwlOptions = {
    loop: false,
    dots: false,
    nav: true,
    navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: true,
    margin: 40,
    responsive: {
      0: {
        items: 1
      },
      416: {
        items: 2
      },
      740: {
        items: 3 
      },
    }
  }

  public auctionInterval: any;
  public currentDateTime: Date = new Date();

  ngOnInit() {
    this.startAuctionTimers();
  }

  startAuctionTimers() {
    this.auctionInterval = setInterval(() => {
      this.currentDateTime = new Date();
      this.updateAuctionTimers();
    }, 1000);
  }
  
  updateAuctionTimers() {
    this.trendingBids.forEach(bid => {
      const auctionEndDate = new Date(bid.auction_date);
      const timeDifference = auctionEndDate.getTime() - this.currentDateTime.getTime();
      
      if (timeDifference <= 0) {
        bid.remaining_time = '0h 0m 0s';
      } else {
        const secondsInDay = 24 * 60 * 60;
        const secondsInHour = 60 * 60;
        const secondsInMinute = 60;
        
        const hours = Math.floor((timeDifference % (secondsInDay * 1000)) / (secondsInHour * 1000));
        const minutes = Math.floor((timeDifference % (secondsInHour * 1000)) / (secondsInMinute * 1000));
        const seconds = Math.floor((timeDifference % (secondsInMinute * 1000)) / 1000);
        
        bid.remaining_time = `${hours}h ${minutes}m ${seconds}s`;
      }
    });
  } 

  ngOnDestroy() {
    if (this.auctionInterval) {
      clearInterval(this.auctionInterval);
    }
  }

}
