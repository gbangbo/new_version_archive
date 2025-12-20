import { Component, Input } from '@angular/core';
import { Gallery, GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Lightbox, LightboxModule } from 'ng-gallery/lightbox';

import { photos } from '../../../../shared/data/social-app';

@Component({
  selector: 'app-social-app-photos',
  imports: [LightboxModule, GalleryModule],
  templateUrl: './social-app-photos.component.html',
  styleUrl: './social-app-photos.component.scss'
})

export class SocialAppPhotosComponent {

  @Input() likesSection: boolean = true;
  
  public photos = photos;
  public items : GalleryItem[];
  public galleryId = 'myLightbox';

  constructor(public gallery: Gallery, public lightbox: Lightbox) {}

  ngOnInit() {
    this.items = this.photos.map(item => new ImageItem({ src: item.preview_url, thumb: item.src_url}));

    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);
  }

  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen'
    });
  }

}
