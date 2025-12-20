import { Component, ElementRef, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Autoplay, EffectCoverflow, Mousewheel, Navigation, Pagination } from "swiper/modules";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { autoPlayVariant } from '../../../../../shared/data/bonus-ui/owl-carousel';

SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel,EffectCoverflow]);

@Component({
  selector: 'app-effect-coverflow',
  imports: [CardComponent],
  templateUrl: './effect-coverflow.component.html',
  styleUrl: './effect-coverflow.component.scss'
})
export class EffectCoverflowComponent {

  public effectCoverFlow = autoPlayVariant;

  public swiperConfig: any = {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
    },

  };
  
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.swiperContainer) {
      new SwiperCore(this.swiperContainer.nativeElement, this.swiperConfig);
    }
  }

}
