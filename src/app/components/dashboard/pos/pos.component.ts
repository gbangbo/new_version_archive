import { Component } from '@angular/core';

import { ProductCategoryComponent } from "./widgets/product-category/product-category.component";
import { ProductComponent } from './widgets/product/product.component';
import { PosCheckoutComponent } from "./widgets/pos-checkout/pos-checkout.component";

@Component({
  selector: 'app-pos',
  imports: [ProductCategoryComponent, ProductComponent, PosCheckoutComponent],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss'
})

export class PosComponent {

}
