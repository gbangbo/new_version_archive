import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';
import { NgxMasonryComponent, NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { masonryImage } from '../../../shared/data/gallery';

@Component({
  selector: 'app-masonry-gallery',
  imports: [CommonModule, NgxMasonryModule, LightboxModule, CardComponent],
  templateUrl: './masonry-gallery.component.html',
  styleUrl: './masonry-gallery.component.scss'
})

export class MasonryGalleryComponent {

  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

  public masonryImage = masonryImage;
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
  };
  public items : GalleryItem[];
  public galleryId = 'myLightbox';

  constructor(public gallery: Gallery, public lightbox: Lightbox) {}

  ngOnInit() {
      this.items = this.masonryImage.map(item => new ImageItem({ src: item.preview_url, thumb: item.src_url}));
  
      const galleryRef = this.gallery.ref(this.galleryId);
      galleryRef.load(this.items);
    }
  
  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen'
    });
  }
  
}
