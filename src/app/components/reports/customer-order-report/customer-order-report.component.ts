import { Component } from '@angular/core';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { customerOrderReport } from '../../../shared/data/reports';
import { TableConfigs } from '../../../shared/interface/common';
import { CustomerOrderReport } from '../../../shared/interface/reports';
import { ChatService } from '../../../shared/services/chat.service';

@Component({
  selector: 'app-customer-order-report',
  imports: [CardComponent, TableComponent],
  templateUrl: './customer-order-report.component.html',
  styleUrl: './customer-order-report.component.scss'
})

export class CustomerOrderReportComponent {

  public customerOrder: CustomerOrderReport[];
  
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Customer Name', field_value: 'customer_name', sort: true },
      { title: 'Customer Group', field_value: 'customer_group', sort: true },
      { title: 'No. Of Orders', field_value: 'orders', sort: true },
      { title: 'No. Of Products', field_value: 'items', sort: true },
      { title: 'Total', field_value: 'total', sort: true, type: 'price' },
    ],
    data: [] as CustomerOrderReport[]
  };

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.tableConfig.data = this.formatCustomerOrder(customerOrderReport);
    this.customerOrder = customerOrderReport;
  }

  private formatCustomerOrder(orders: CustomerOrderReport[]) {
    return orders.map((order: CustomerOrderReport) => {
      const formattedOrder = { ...order };
      formattedOrder.customer_name = `<div class="customer-details">
                                        <img class="max-w-full" src="${order.customer_profile}" alt="${order.customer_name}">
                                        <div>
                                        <a href="javascript:void(0">${order.customer_name}</a>
                                          <p class="c-o-light">${order.customer_email}</p>
                                        </div>
                                      </div>`;
      
      let customerGroupHTML = '';
      for (let i = 0; i < order.customer_group.length; i++) {
        
        if(order.customer_group[i]['profile']) {
          customerGroupHTML += `<li>
                                  <img class="common-circle" src="${order.customer_group[i]['profile']}" alt="user">
                                </li>`;
        } else {
          customerGroupHTML += `<li> 
                                  <div class="common-circle bg-lighter-${this.chatService.getTextColor(this.chatService.getUserText(order.customer_group[i]['name']))}">${this.chatService.getUserText(order.customer_group[i]['name'], 'singleText')}</div>
                                </li>`
        }
      }
      formattedOrder.customer_group = `<ul class="common-f-start customer-group">
                                        ${customerGroupHTML}
                                      </ul>`

      
      return formattedOrder;
    });
  }
}
