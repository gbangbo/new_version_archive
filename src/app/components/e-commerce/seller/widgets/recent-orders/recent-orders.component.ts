import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { recentOrders } from '../../../../../shared/data/store';
import { TableConfigs } from '../../../../../shared/interface/common';
import { RecentOrders } from '../../../../../shared/interface/store';

@Component({
  selector: 'app-recent-orders',
  imports: [CardComponent, TableComponent],
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss'
})

export class RecentOrdersComponent {

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Order Number', field_value: 'order_number', sort: true },
      { title: 'Date', field_value: 'date', sort: true },
      { title: 'Customers', field_value: 'customer_name', sort: true, },
      { title: 'Amount', field_value: 'amount', sort: true },
      { title: 'Payment', field_value: 'payment', sort: true },
    ],
    row_action: [
      { label: "View", action_to_perform: "view", icon: "eye", path: '/order/details' },
    ],
    data: [] as RecentOrders[]
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.tableConfig.data = recentOrders.map((order: RecentOrders) => {
      const formattedOrder = { ...order };
      formattedOrder.order_number = `<a>${order.order_number}</a>`;
      formattedOrder.date = `<p class="c-o-light">${order.date}</p>`;
      formattedOrder.customer_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                                      <img class="max-w-full rounded-full" src="${order.customer_profile}" alt="user">
                                      <a href="javascript:void(0)"  onclick="navigate()">${order.customer_name}</a>
                                  </div>`);

      formattedOrder.amount = `<p class="c-o-light">$${order.amount}</p>`;

      formattedOrder.payment = `<span class="badge badge-light-${order.payment == 'Completed' ? 'success' :
                                order.payment == 'Shipped' ? 'secondary' :
                                order.payment == 'Pending' ? 'warning' : ''}">${order.payment}</span>`;

      return formattedOrder;
    });
  }
}
