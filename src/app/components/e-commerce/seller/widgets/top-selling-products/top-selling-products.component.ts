import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { topSellingProducts } from '../../../../../shared/data/store';
import { TableConfigs } from '../../../../../shared/interface/common';
import { TopSellingProduct } from '../../../../../shared/interface/store';

@Component({
  selector: 'app-top-selling-products',
  imports: [CardComponent, TableComponent],
  templateUrl: './top-selling-products.component.html',
  styleUrl: './top-selling-products.component.scss'
})

export class TopSellingProductsComponent {

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Product', field_value: 'product_name', sort: true },
      { title: 'Category', field_value: 'category', sort: true },
      { title: 'Price', field_value: 'price', sort: true, },
      { title: 'Orders', field_value: 'orders', sort: true },
      { title: 'Stock', field_value: 'stock', sort: true },
      { title: 'Total Amount', field_value: 'total_amount', sort: true, },
    ],
    data: [] as TopSellingProduct[]
  };

  ngOnInit() {
    this.tableConfig.data = topSellingProducts.map((product: TopSellingProduct) => {
      const formattedProduct = { ...product };
      formattedProduct.product_name = `<div class="product-names">
                                <div class="light-product-box">
                                  <img class="max-w-full" src="${product.product_image}" alt="${product.product_name}"></div>
                                <p>${product.product_name}</p>
                              </div>`;
      product.category = `<p class="c-o-light">${product.category}</p>`;
      formattedProduct.price = `<p class="c-o-light">${'$' + product.price}</p>`;
      formattedProduct.orders = `<p class="c-o-light">${product.orders}</p>`;
      formattedProduct.stock = `<p class="c-o-light">${product.stock}</p>`;
      formattedProduct.total_amount = `<p class="c-o-light">${'$' + product.total_amount}</p>`;

      return formattedProduct;
    });
  }
}
