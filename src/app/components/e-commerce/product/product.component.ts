import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductBoxComponent } from "./widgets/product-box/product-box.component";
import { ProductSidebarComponent } from "./widgets/product-sidebar/product-sidebar.component";
import { ProductSortComponent } from "./widgets/product-sort/product-sort.component";
import { products } from '../../../shared/data/product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, RouterModule, ProductSortComponent, ProductSidebarComponent, ProductBoxComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {

  public products = products;

  constructor(public productService: ProductService) {}

}
