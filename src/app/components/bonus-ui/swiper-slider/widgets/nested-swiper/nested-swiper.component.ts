import { Component, ElementRef, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { nestedSwiper } from '../../../../../shared/data/bonus-ui/owl-carousel';

SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel]);

@Component({
  selector: 'app-nested-swiper',
  imports: [CardComponent],
  templateUrl: './nested-swiper.component.html',
  styleUrl: './nested-swiper.component.scss'
})
export class NestedSwiperComponent {

  public nestedSwiper = nestedSwiper;
  
  public swiperConfig: any = {
    spaceBetween: 50,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  public swiperConfig2: any = {
    direction: "vertical",
    spaceBetween: 50,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };
  
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  @ViewChild('swiperContainer2', { static: false }) swiperContainer2!: ElementRef;

  ngAfterViewInit() {
    if (this.swiperContainer) {
      new SwiperCore(this.swiperContainer.nativeElement, this.swiperConfig);
    }
    if (this.swiperContainer2) {
      new SwiperCore(this.swiperContainer2.nativeElement, this.swiperConfig2);
    }
  }

}
