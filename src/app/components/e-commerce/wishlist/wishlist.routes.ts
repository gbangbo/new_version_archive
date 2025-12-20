import { Routes } from "@angular/router";

import { WishlistComponent } from "./wishlist.component";

export const wishlist: Routes = [
  {
    path: '',
    component: WishlistComponent,
    data: {
      title: 'Wishlist',
      breadcrumb: 'Wishlist'
    }
  }
]
