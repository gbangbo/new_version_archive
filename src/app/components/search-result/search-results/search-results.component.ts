import { CommonModule, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BarRatingModule } from "ngx-bar-rating";

import { blogDetails } from '../../../shared/data/blog';
import { PaginationComponent } from '../pagination/pagination.component';
import { audios, themes, videos } from '../../../shared/data/search-result';
import { Audio } from '../../../shared/interface/search-result';

@Component({
  selector: 'app-search-results',
  imports: [SlicePipe,BarRatingModule, PaginationComponent,CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})

export class SearchResultsComponent {

  public themes = themes;
  public blogDetails = blogDetails[0];
  public audios = audios;
  public videos = videos;
  
  constructor(public sanitizer: DomSanitizer) {}
  
  getAudios() {
    return this.audios.filter(audio => audio.is_top_rated);
  }

  playAudio(audio: Audio) {
    if(!audio.is_play) {
      this.audios.forEach((audios) => {
        if(this.audios.includes(audio)) {
          audios.is_play = false;
        }
      })
    }
    audio.is_play =! audio.is_play;
  }

  safe(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
}

