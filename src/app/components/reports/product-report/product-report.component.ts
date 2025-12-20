import { Component } from '@angular/core';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../shared/components/ui/table/table.component';
import { productReports } from '../../../shared/data/reports';
import { TableConfigs } from '../../../shared/interface/common';
import { ProductReports } from '../../../shared/interface/reports';

@Component({
  selector: 'app-product-report',
  imports: [CardComponent, TableComponent],
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.scss'
})

export class ProductReportComponent {

  public products: ProductReports[];
  
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Product Name', field_value: 'product_name', sort: true },
      { title: 'SKU', field_value: 'sku', sort: true },
      { title: 'Total Product Sold', field_value: 'product_sold', sort: true },
      { title: 'Price', field_value: 'price', sort: true, type: 'price', decimal_number: true },
      { title: 'Rating', field_value: 'rating', sort: true },
    ],
    data: [] as ProductReports[]
  };

  ngOnInit() {
    this.tableConfig.data = this.formatProductDetails(productReports);
    this.products = productReports;
  }

  private formatProductDetails(products: ProductReports[]) {
    return products.map((product: ProductReports) => {
      const formattedProducts = { ...product };
      formattedProducts.product_name = `<div class="product-names">
                                          <div class="light-product-box">
                                            <img class="max-w-full" src="${product.product_image}" alt="${product.product_name}">
                                          </div>
                                          <p>${product.product_name}</p>
                                        </div>`;

      const totalStars = 5;
      let starsHtml = '';
      for (let i = 0; i < product.rating; i++) {
        starsHtml += '<i class="fa-solid fa-star txt-warning"></i>';
      }

      for (let i = product.rating; i < totalStars; i++) {
        starsHtml += '<i class="fa-regular fa-star txt-warning"></i>';
      }

      formattedProducts.rating = `<div class="rating">${starsHtml}</div>`;
      formattedProducts.date = `${product.date}`;

      return formattedProducts;
    });
  }
  
}
