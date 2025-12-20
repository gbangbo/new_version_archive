import { Routes } from '@angular/router';

import { ProductComponent } from './product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const product: Routes = [
    {
        path: 'grid',
        component: ProductComponent,
        data : {
            title : "Product",
            breadcrumb: "Product"
        },
    },
    {
        path: 'create',
        component: CreateProductComponent,
        data : {
            title : "Product",
            breadcrumb: "Product"
        },
    },
    {
        path: 'list',
        component: ProductListComponent,
        data : {
            title : "Product List",
            breadcrumb: "Product List"
        }
    },
    {
      path: 'details',
      component: ProductDetailsComponent,
        data : {
            title : "Product Details",
            breadcrumb: "Product Details"
        }
    }
];
