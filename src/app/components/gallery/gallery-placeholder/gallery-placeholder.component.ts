import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';

import { galleryPlaceholder } from '../../../shared/data/gallery';

@Component({
  selector: 'app-gallery-placeholder',
  imports: [CommonModule, LightboxModule],
  templateUrl: './gallery-placeholder.component.html',
  styleUrl: './gallery-placeholder.component.scss'
})

export class GalleryPlaceholderComponent {

  public galleryPlaceholder = galleryPlaceholder;
  public loader: number[] = Array.from({ length: 12 }, (_, index) => index);
  public isLoading: boolean = true;
  public items: GalleryItem[];
  public galleryId = 'myLightbox';

  constructor(public gallery: Gallery, public lightbox: Lightbox) { }

  ngOnInit() {

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    this.items = this.galleryPlaceholder.map(item => new ImageItem({ src: item.preview_url, thumb: item.src_url }));

    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }

  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen'
    });
  }
  
}
