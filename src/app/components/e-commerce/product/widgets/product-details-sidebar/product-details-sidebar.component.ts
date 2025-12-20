import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { productCategory, services } from '../../../../../shared/data/product';

@Component({
  selector: 'app-product-details-sidebar',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './product-details-sidebar.component.html',
  styleUrl: './product-details-sidebar.component.scss'
})

export class ProductDetailsSidebarComponent {

  public productCategory = productCategory;
  public services = services;

}
