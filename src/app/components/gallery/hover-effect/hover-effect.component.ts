import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { imgDetails } from '../../../shared/data/gallery';
import { Images } from '../../../shared/interface/gallery';

@Component({
  selector: 'app-hover-effect',
  imports: [CommonModule, LightboxModule, CardComponent],
  templateUrl: './hover-effect.component.html',
  styleUrl: './hover-effect.component.scss'
})

export class HoverEffectComponent {

  public imgDetails = imgDetails;
  public items: GalleryItem[];
  public galleryId = 'myLightbox';

  constructor(public gallery: Gallery, public lightbox: Lightbox) { }

  openInFullScreen(index: number, images: Images[]) {
    
    this.items = images.map(image => new ImageItem({
      src: image.preview_url,
      thumb: image.src_url
    }));

    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen'
    });

    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }

}