import { Routes } from "@angular/router";

import { CartComponent } from "./cart.component";

export const cart: Routes = [
  {
    path: '',
    component: CartComponent,
    data: {
      title: 'Cart',
      breadcrumb: 'Cart'
    }
  }
]
