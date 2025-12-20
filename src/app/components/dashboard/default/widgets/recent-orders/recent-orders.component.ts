import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { recentOrders } from '../../../../../shared/data/dashboard/default';
import { RecentOrders } from '../../../../../shared/interface/dashboard/default';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-recent-orders',
  imports: [CardComponent, TableComponent],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss'
})

export class RecentOrdersComponent {

  public cardToggleOptions = cardToggleOptions1;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Product Name', field_value: 'product_name', sort: true },
      { title: 'Customers', field_value: 'customer_name', sort: true },
      { title: 'Qty', field_value: 'quantity', sort: true, type: 'qty' },
      { title: 'Total Price', field_value: 'total_price', sort: true, type: 'price' },
      { title: 'Order Date', field_value: 'order_date', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    data: [] as RecentOrders[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {

    (window as any)['navigate'] = () => {
      this.router.navigate(['/product/details']);
    };

    this.tableConfig.data = recentOrders.map((order: RecentOrders) => {
      const formattedOrder = { ...order };
      formattedOrder.product_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="flex items-center gap-2">
                                  <div class="currency-icon warning">
                                    <img class="max-w-full" src="${order.product_image}" alt="${order.product_name}">
                                </div>
                                  <div> <a class="f-14 mb-0 font-medium c-light" href="javascript:void(0)" onclick="navigate()">${order.product_name}</a>
                                    <p class="c-o-light">${order.product_id}</p>
                                  </div>
                                </div>`);

      const statusHTML = `<button class="btn button-light-${order.status_color} txt-${order.status_color} font-medium">${order.status}</button>`;

      formattedOrder.status = this.sanitizer.bypassSecurityTrustHtml(statusHTML)
      
      return formattedOrder;
    });
  }

}

