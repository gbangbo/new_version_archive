import { Component } from '@angular/core';

import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { ProductService } from '../../../../../shared/services/product.service';

@Component({
  selector: 'app-product-sort',
  imports: [FeatherIconComponent],
  templateUrl: './product-sort.component.html',
  styleUrl: './product-sort.component.scss'
})

export class ProductSortComponent {

  constructor(public productService: ProductService) {}

}
