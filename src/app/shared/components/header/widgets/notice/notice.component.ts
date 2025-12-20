import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import SwiperCore from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-header-notice',
  imports: [CommonModule],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.scss',
})

export class NoticeComponent {

  @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;

  public notice = [
    `<img src="assets/images/giftools.gif" alt="gif"/><h6 class="mb-0 font-normal"><span class="font-primary">Archivage numérique :&nbsp </span><span class="f-light">l'innovation au service de votre entreprise.</span></h6><i class="icon-arrow-top-right f-light"></i>`,
    `<img src="assets/images/giftools.gif" alt="gif"/><h6 class="mb-0 font-normal"><span class="f-light">L'archivage simplifié, la gestion optimisée.</span></h6><i class="icon-arrow-top-right f-light"></i>`,
  ];
// `<!--<img src="assets/images/giftools.gif" alt="gif"/><h6 class="mb-0 font-normal"><span class="f-light">L'archivage simplifié, la gestion optimisée.</span></h6><a class="ms-1" href="javascript:void(0)" target="_blank">Build v4</a><i class="icon-arrow-top-right f-light"></i>-->`,

  public swiperConfig: any = {
    slidesPerView: 1,
    navigation: false,
    direction: 'vertical',
    autoHeight: true,
    allowTouchMove: true,
    scrollbar: { draggable: true },
    pagination: { clickable: true },
    loop: true,
    autoplay: { delay: 2000 },
  };

  ngAfterViewInit() {
    if (this.swiperContainer) {
      new SwiperCore(this.swiperContainer.nativeElement, this.swiperConfig);
    }
  }

}
