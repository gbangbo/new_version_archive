import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { trendingProducts } from '../../../../../shared/data/dashboard/e-commerce';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TrendingProducts } from '../../../../../shared/interface/dashboard/e-commerce';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-trending-products',
  imports: [CardComponent, TableComponent],
  templateUrl: './trending-products.component.html',
  styleUrl: './trending-products.component.scss'
})

export class TrendingProductsComponent {

  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Product Name', field_value: 'product_name', sort: true },
      { title: 'Category', field_value: 'category', sort: true },
      { title: 'Sold', field_value: 'sold_item', sort: true, },
    ],
    data: [] as TrendingProducts[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToTrendingProduct'] = () => {
      this.router.navigate(['/product/list']);
    };

    this.tableConfig.data = trendingProducts.map((product: TrendingProducts) => {
      const formattedProduct = { ...product };
      formattedProduct.product_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                              <img class="max-w-full rounded-full" src="${product.product_image}" alt="user">
                              <a class="font-medium" href="javascript:void(0)" onclick="navigateToTrendingProduct()">${product.product_name}</a>
                            </div>`);
                            
      return formattedProduct;
    });
  }

}
