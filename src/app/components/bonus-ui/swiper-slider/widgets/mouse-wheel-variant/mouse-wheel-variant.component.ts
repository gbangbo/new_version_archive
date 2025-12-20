import { Component, ElementRef, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Autoplay, Mousewheel, Navigation, Pagination } from "swiper/modules";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { mouseWheelVariant } from '../../../../../shared/data/bonus-ui/owl-carousel';

SwiperCore.use([Navigation, Pagination, Autoplay, Mousewheel]);

@Component({
  selector: 'app-mouse-wheel-variant',
  imports: [CardComponent],
  templateUrl: './mouse-wheel-variant.component.html',
  styleUrl: './mouse-wheel-variant.component.scss'
})
export class MouseWheelVariantComponent {

  public mouseWheelVariant = mouseWheelVariant;
  
  public swiperConfig: any = {
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };
  
  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;
  
  ngAfterViewInit() {
    if (this.swiperContainer) {
      new SwiperCore(this.swiperContainer.nativeElement, this.swiperConfig);
    }
  }

}
