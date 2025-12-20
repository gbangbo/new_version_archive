import { CommonModule, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { audios } from '../../../shared/data/search-result';
import { Audio } from '../../../shared/interface/search-result';
import { TooltipComponent } from "../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-search-result-audio',
  imports: [RouterModule, CommonModule, SlicePipe, CarouselModule, TooltipComponent],
  templateUrl: './search-result-audio.component.html',
  styleUrl: './search-result-audio.component.scss'
})

export class SearchResultAudioComponent {

  public audios = audios;
  public carouselOption: OwlOptions = {
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
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  }

  ngAfterViewChecked() {
    window.dispatchEvent(new Event('resize'));
  }

  playAudio(audio: Audio) {
    if (!audio.is_play) {
      this.audios.forEach((audios) => {
        if (this.audios.includes(audio)) {
          audios.is_play = false;
        }
      })
    }
    audio.is_play = !audio.is_play;
  }

}
