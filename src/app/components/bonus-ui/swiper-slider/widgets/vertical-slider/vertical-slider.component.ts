import { Component, ElementRef, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { verticalSlider } from '../../../../../shared/data/bonus-ui/owl-carousel';

SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel]);

@Component({
  selector: 'app-vertical-slider',
  imports: [CardComponent],
  templateUrl: './vertical-slider.component.html',
  styleUrl: './vertical-slider.component.scss'
})
export class VerticalSliderComponent {

  public verticalSlider = verticalSlider;

  public swiperConfig: any = {
    slidesPerView: 1,
    navigation: false,
    direction: "vertical",
    autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    loop: true,
    autoplay: { delay: 3000, disableOnInteraction: false }
  };

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.swiperContainer) {
      new SwiperCore(this.swiperContainer.nativeElement, this.swiperConfig);
    }
  }

}
