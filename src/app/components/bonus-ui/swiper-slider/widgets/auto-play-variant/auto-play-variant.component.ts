import { Component, ElementRef, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { autoPlayVariant } from '../../../../../shared/data/bonus-ui/owl-carousel';

SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel]);

@Component({
  selector: 'app-auto-play-variant',
  imports: [CardComponent],
  templateUrl: './auto-play-variant.component.html',
  styleUrl: './auto-play-variant.component.scss'
})
export class AutoPlayVariantComponent {

  public autoPlayVariant = autoPlayVariant;

  public swiperConfig: any = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
  
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.swiperContainer) {
      new SwiperCore(this.swiperContainer.nativeElement, this.swiperConfig);
    }
  }

}
