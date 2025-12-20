import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../shared/components/ui/table/table.component';
import { OrderFilterComponent } from "./widgets/order-filter/order-filter.component";
import { orders } from '../../../shared/data/order';
import { TableClickedAction, TableConfigs } from '../../../shared/interface/common';
import { Order } from '../../../shared/interface/order';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, OrderFilterComponent, CardComponent, TableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export class OrdersComponent {

  public orders = orders;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Order Number', field_value: 'order_number', sort: true },
      { title: 'Order Date', field_value: 'order_date', sort: true },
      { title: 'Customer Name', field_value: 'customer_name', sort: true },
      { title: 'Total Amount', field_value: 'total_amount', sort: true },
      { title: 'Payment Status', field_value: 'payment_status', sort: true },
      { title: 'Payment Method', field_value: 'payment_method', sort: true },
    ],
    row_action: [
      { label: "View", action_to_perform: "view", icon: "eye" },
      { label: "Delete", action_to_perform: "delete", icon: "trash1", modal: true, model_text: 'Do you really want to delete the order History?' }

    ],
    data: [] as Order[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToOrder'] = () => {
      this.router.navigate(['/order/1']);
    };

    this.tableConfig.data = this.order(this.orders);
  }

  handleAction(value: TableClickedAction) {
    if (value.action_to_perform === "view" && value.data) {
      const order = this.orders.find((order) => order.id == value.data.id);
      if (order) {
        this.router.navigate([`/order/${order.order_number}`]);
      }
    }
    if (value.action_to_perform === "delete" && value.data) {
      this.orders = this.orders.filter((order: Order) => order.id !== value.data.id);
      this.tableConfig = { ...this.tableConfig, data: this.order(this.orders) };
    }
  }

  private order(orders: Order[]) {
    return orders.map((order: Order) => {
      const formattedOrder = { ...order };

      formattedOrder.order_number = this.sanitizer.bypassSecurityTrustHtml(`<a href="javascript:void(0)" onclick="navigateToOrder()">#${order.order_number}</a>`);
      formattedOrder.order_date = `<p class="c-o-light">${order.order_date}</p>`;
      formattedOrder.customer_name = `<p class="c-o-light">${order.customer_name}</p>`;
      formattedOrder.total_amount = `<p class="c-o-light">$${order.total_amount}</p>`;
      formattedOrder.payment_status = `<span class="badge badge-light-${order.payment_status == 'Pending' ? 'warning' :
                                        order.payment_status == 'Failed' ? 'danger' :
                                        order.payment_status == 'Completed' ? 'success' : ''}">${order.payment_status}</span>`;

      return formattedOrder;
    });
  }

}
