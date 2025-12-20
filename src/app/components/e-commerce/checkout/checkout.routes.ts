import { Routes } from "@angular/router";

import { CheckoutComponent } from "./checkout.component";

export const checkout: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    data: {
      title: 'Checkout',
      breadcrumb: 'Checkout'
    }
  }
]
