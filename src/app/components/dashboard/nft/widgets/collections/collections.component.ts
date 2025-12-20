import { Component, ViewChild } from '@angular/core';
import { CarouselModule, OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { collections } from '../../../../../shared/data/dashboard/nft';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-collections',
  imports: [CarouselModule, CardComponent],
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})

export class CollectionsComponent {

  @ViewChild('thumbnailCarousel') thumbnailCarousel: any;

  public cardToggleOption = cardToggleOptions1;
  public collections = collections;
  public activeSlide: string = '1';

  public productMainThumbSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    dotsData: true,
    autoplayHoverPause: false,
    nav: false,
    autoplay: false,
    navSpeed: 300,
    autoHeight: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  public productThumbSlider: OwlOptions = {
    loop: false,
    dots: false,
    margin: 16,
    navSpeed: 300,
    autoHeight: true,
    items: 3,
    responsive: {
      0: {
        items: 3,
        autoHeight: true,
      },
      400: {
        items: 3,
      }
    },
  };

  onCarouselLoad() {
    this.activeSlide = '1';
  }

  onSlideChange(event: SlidesOutputData) {
    if (this.collections) {
      if (this.thumbnailCarousel && event && event.slides && event.slides[0].id && event.slides.length > 0) {
        this.activeSlide = event.slides[0].id;

        if (this.activeSlide) {
          this.thumbnailCarousel.to(this.activeSlide);
        }
      }
    }
  }

  trackByCollection(index: number, collection: any): string {
    return collection.id;
  }
}
