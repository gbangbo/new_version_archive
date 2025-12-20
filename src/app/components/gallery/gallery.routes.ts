import { Routes } from '@angular/router';

import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';
import { GalleryGridDescComponent } from './gallery-grid-desc/gallery-grid-desc.component';
import { MasonryGalleryComponent } from './masonry-gallery/masonry-gallery.component';
import { MasonryWithDescComponent } from './masonry-with-desc/masonry-with-desc.component';
import { HoverEffectComponent } from './hover-effect/hover-effect.component';
import { GalleryPlaceholderComponent } from './gallery-placeholder/gallery-placeholder.component';

export const gallery: Routes = [
  {
    path: 'gallery-grid',
    component: GalleryGridComponent,
    data: {
      title: 'Gallery',
      breadcrumb: 'Gallery'
    }
  },
  {
    path: 'gallery-grid-desc',
    component: GalleryGridDescComponent,
    data: {
      title: 'Gallery Grid With Description',
      breadcrumb: 'Gallery Grid With Description'
    }
  },
  {
    path: 'masonry-gallery',
    component: MasonryGalleryComponent,
    data: {
      title: 'Masonry Gallery',
      breadcrumb: 'Masonry Gallery'
    }
  },
  {
    path: 'masonry-with-desc',
    component: MasonryWithDescComponent,
    data: {
      title: 'Masonry Gallery With Description',
      breadcrumb: 'Masonry Gallery With Description'
    }
  },
  {
    path: 'hover-effects',
    component: HoverEffectComponent,
    data: {
      title: 'Image Hover Effects',
      breadcrumb: 'Image Hover Effects'
    }
  },
  {
    path: 'gallery-placeholder',
    component: GalleryPlaceholderComponent,
    data: {
      title: 'Gallery With Placeholder',
      breadcrumb: 'Gallery With Placeholder'
    }
  }
]
