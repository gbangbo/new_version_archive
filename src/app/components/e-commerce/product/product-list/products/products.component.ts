import { Component, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { products } from '../../../../../shared/data/product';
import { TableClickedAction, TableConfigs } from '../../../../../shared/interface/common';
import { Product } from '../../../../../shared/interface/product';

@Component({
  selector: 'app-products',
  imports: [TableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {

  @Input() pageSize: number = 14;
  @Input() hideColumns: string[] = [];

  public products: Product[];

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Product Name', field_value: 'product_name', sort: true },
      { title: 'SKU', field_value: 'sku', sort: true, },
      { title: 'Category', field_value: 'category', sort: true },
      { title: 'Price', field_value: 'price', sort: true },
      { title: 'Qty', field_value: 'qty', sort: true, },
      { title: 'Status', field_value: 'stock', sort: true },
      { title: 'Rating', field_value: 'rating', sort: true },
    ],
    row_action: [
      { label: "Edit", action_to_perform: "edit", icon: "edit-content", path: "/product/create" },
      { label: "Delete", action_to_perform: "delete", icon: "trash1", modal: true }
    ],
    data: [] as Product[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hideColumns']) {
      this.tableConfig.columns.forEach(column => {
        column.hide_column = this.hideColumns.includes(column.field_value);
      });
    }
  }

  ngOnInit() {
    (window as any)['navigateToProduct'] = () => {
      this.router.navigate(['/product/details']);
    };

    this.tableConfig.data = this.formatProductDetails(products);
    this.products = products;
  }

  handleAction(value: TableClickedAction) {
    if (value.action_to_perform === "delete" && value.data) {
      this.products = this.products.filter((product: Product) => product.id !== value.data.id);
      this.tableConfig = { ...this.tableConfig, data: this.formatProductDetails(this.products) };
    }
  }

  private formatProductDetails(products: Product[]) {
    return products.map((product: Product) => {
      const formattedProducts = { ...product };
      formattedProducts.product_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="product-names">
                                        <div class="light-product-box">
                                          <img class="max-w-full" src="${product.image}" alt="${product.product_name}">
                                        </div>
                                        <a href="javascript:void(0)"  onclick="navigateToProduct()">${product.product_name}</a>
                                      </div>`);
                                      
      formattedProducts.sku = `<p class="c-o-light">${product.sku}</p>`;
      formattedProducts.category = `<p class="c-o-light">${product.category}</p>`;
      formattedProducts.price = `<p class="c-o-light">${Number(product.price).toFixed(2)}</p>`;
      formattedProducts.qty = `<p class="c-o-light">${product.qty}</p>`;
      formattedProducts.stock = product.stock === 'in_stock' ?
        `<span class="badge badge-light-primary">${product.stock.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</span>` :
        product.stock === 'out_of_stock' ?
          `<span class="badge badge-light-secondary">${product.stock.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</span>` : '-';

      const totalStars = 4;
      let starsHtml = '';
      for (let i = 0; i < product.rating; i++) {
        starsHtml += '<i class="fa-solid fa-star txt-warning"></i>';
      }

      for (let i = product.rating; i < totalStars; i++) {
        starsHtml += '<i class="fa-regular fa-star txt-warning"></i>';
      }

      formattedProducts.rating = `<div class="rating">${starsHtml}</div>`;
      return formattedProducts;
    });
  }

}
