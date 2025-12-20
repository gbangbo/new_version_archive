import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Gallery, GalleryItem, GalleryModule, ImageItem, ImageSize, ThumbnailsPosition } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { galleryGridDetails } from '../../../shared/data/gallery';

@Component({
  selector: 'app-gallery-grid',
  imports: [CommonModule, LightboxModule, GalleryModule, CardComponent],
  templateUrl: './gallery-grid.component.html',
  styleUrl: './gallery-grid.component.scss'
})

export class GalleryGridComponent {

  public galleryGridDetails = galleryGridDetails;

  public items: GalleryItem[];

  constructor(public gallery: Gallery, public lightbox: Lightbox) { }

  ngOnInit() {
    
    this.items = this.galleryGridDetails.map(item => new ImageItem({ src: item.src_url, thumb: item.src_url }));
    const lightboxRef = this.gallery.ref('lightbox');

    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Bottom,
    });

    lightboxRef.load(this.items)
  }

}
