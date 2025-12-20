import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../../shared/components/ui/table/table.component';
import { BillingDetailsComponent } from '../widgets/billing-details/billing-details.component';
import { CustomerDetailsComponent } from "../widgets/customer-details/customer-details.component";
import { orderDetails, orderDetailsTab } from '../../../../shared/data/order';
import { TableConfigs } from '../../../../shared/interface/common';
import { OrderDetailsProduct } from '../../../../shared/interface/order';

@Component({
  selector: 'app-order-details',
  imports: [CardComponent, TableComponent, BillingDetailsComponent, CustomerDetailsComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})

export class OrderDetailsComponent {

  public currentTab: number = 3;
  public orderDetailsTab = orderDetailsTab;
  public orderDetails = orderDetails;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Image', field_value: 'product_image', sort: true },
      { title: 'Product', field_value: 'product_name', sort: true },
      { title: 'Price', field_value: 'discount_price', sort: true, type: 'price', decimal_number: true },
      { title: 'Qty', field_value: 'quantity', sort: true },
      { title: 'Subtotal', field_value: 'sub_total', sort: true, type: 'price', decimal_number: true },
    ],
    data: [] as OrderDetailsProduct[]
  };

  ngOnInit() {
    let products = this.orderDetails.products.map((product: OrderDetailsProduct) => {
      const formattedProduct = { ...product }
      formattedProduct.product_image = `<div class="light-product-box">
                                          <img class="max-w-full" src="${product.product_image}" alt="${product.product_name}">
                                        </div>`;

      formattedProduct.product_name = `<ul>
                                        <li>
                                          <h6> <a href="javascript:void(0)">${product.product_name}</a></h6>
                                        </li>
                                        <li>
                                          <p>${product.brand}</p><span class="common-dot"></span><span>Color:<span> ${product.color}</span></span>
                                        </li>
                                      </ul>`;

      return formattedProduct;
    })
    
    this.tableConfig.data = products ? products : [];
  }
}
