import { Routes } from '@angular/router';

import { SellerComponent } from './seller.component';
import { DetailsComponent } from './details/details.component';

export const seller: Routes = [
    {
        path: 'list',
        component: SellerComponent,
        data: {
            title: 'Seller List',
            breadcrumb: 'Seller List'
          }
    },
    {
        path: ':id',
        component: DetailsComponent,
        data: {
            title: 'Seller Details',
            breadcrumb: 'Seller Details'
          }
    }
];
