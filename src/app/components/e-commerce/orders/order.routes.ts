import { Routes } from "@angular/router";

import { OrdersComponent } from "./orders.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";

export const order: Routes = [
  {
    path: 'list',
    component: OrdersComponent,
    data: {
      title: 'Order History',
      breadcrumb: 'Order History'
    }
  },
  {
    path: ':id',
    component: OrderDetailsComponent,
    data: {
      title: 'Order Details',
      breadcrumb: 'Order Details'
    }
  }
]
