import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { exploreArtwork } from '../../../../../shared/data/dashboard/nft';

@Component({
  selector: 'app-explore-artwork',
  imports: [CarouselModule, CardComponent],
  templateUrl: './explore-artwork.component.html',
  styleUrl: './explore-artwork.component.scss'
})

export class ExploreArtworkComponent {

  public exploreArtwork = exploreArtwork;

  public options: OwlOptions = {
      loop: false,
      dots: false,
      nav: false,
      autoplay: true,
      autoplaySpeed: 2000,
      lazyLoad: true,
      margin: 40,
      responsive: {
        0: {
          items: 1
        },
        336: {
          items: 2
        },
        674 : {
          items: 3
        },
        926: {
          items: 4
        },
        1094: {
          items: 5
        }
      }
  }
}
