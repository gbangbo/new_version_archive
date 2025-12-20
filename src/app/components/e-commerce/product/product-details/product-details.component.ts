import { Component, ViewChild } from '@angular/core';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { ProductContentComponent } from "../widgets/product-content/product-content.component";
import { ProductDetailsSidebarComponent } from "../widgets/product-details-sidebar/product-details-sidebar.component";
import { ProductDetailsTabComponent } from "../widgets/product-details-tab/product-details-tab.component";

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, NgxImageZoomModule, CardComponent, 
            ProductContentComponent, ProductDetailsSidebarComponent, ProductDetailsTabComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent {

  public activeSlide: string = '1';

  public images = [
    { id: 1, img: 'assets/images/ecommerce/01.jpg' },
    { id: 2, img: 'assets/images/ecommerce/02.jpg' },
    { id: 3, img: 'assets/images/ecommerce/03.jpg' },
    { id: 4, img: 'assets/images/ecommerce/04.jpg' },
    { id: 5, img: 'assets/images/ecommerce/05.jpg' },
    { id: 6, img: 'assets/images/ecommerce/06.jpg' },
    { id: 7, img: 'assets/images/ecommerce/07.jpg' },
    { id: 8, img: 'assets/images/ecommerce/08.jpg' }
  ]

  public productMainThumbSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    dotsData: true,
    autoplayHoverPause: false,
    nav: false,
    autoplay: true,
    navSpeed: 300,
    autoHeight: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  public productThumbSlider: OwlOptions = {
    loop: true,
    dots: false,
    margin: 16,
    navSpeed: 300,
    autoHeight: true,
    items: 4,
    responsive: {
      0: {
        items: 3,
        autoHeight: true,
      },
      400: {
        items: 4,
      }
    },
  };

  @ViewChild('thumbnailCarousel') thumbnailCarousel: any;

  onCarouselLoad() {
    this.activeSlide = '1';
  }

  onSlideChange(event: SlidesOutputData) {
    if(this.images){
      if (this.thumbnailCarousel && event && event.slides && event.slides[0].id && event.slides.length > 0) {
        this.activeSlide = event.slides[0].id;
  
        if (this.activeSlide) {
          this.thumbnailCarousel.to(this.activeSlide);
        }
      }
    }
  }
}

