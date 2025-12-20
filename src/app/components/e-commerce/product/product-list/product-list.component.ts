import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductSidebarComponent } from "../widgets/product-sidebar/product-sidebar.component";
import { ProductsComponent } from "./products/products.component";
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, ProductSidebarComponent, ProductsComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent {

  constructor(public productService: ProductService) {}

}
