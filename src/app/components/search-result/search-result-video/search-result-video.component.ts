import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { videos } from '../../../shared/data/search-result';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-search-result-video',
  imports: [PaginationComponent],
  templateUrl: './search-result-video.component.html',
  styleUrl: './search-result-video.component.scss'
})

export class SearchResultVideoComponent {

  public videos = videos;

  public safeVideos: { id: number; title: string; url: SafeResourceUrl; rating: number; votes: number; type: string }[] = [];

  constructor(public sanitizer: DomSanitizer) {
    this.preprocessUrls();
  }

  preprocessUrls() {
    this.safeVideos = this.videos.map(video => ({
      ...video,
      url: this.sanitizer.bypassSecurityTrustResourceUrl(video.url)
    }));
  }
  
}
