import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { recentTransactions } from '../../../../../shared/data/dashboard/e-commerce';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-recent-transactions',
  imports: [CardComponent, TableComponent],
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss'
})

export class RecentTransactionsComponent {

  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Transaction ID', field_value: 'transaction_id', sort: true },
      { title: 'Date', field_value: 'date', sort: true },
      { title: 'Customers', field_value: 'customer_name', sort: true },
      { title: 'Product', field_value: 'product_name', sort: true },
      { title: 'QTY', field_value: 'quantity', sort: true },
      { title: 'Payments', field_value: 'payments', sort: true },
      { title: 'Total Amount', field_value: 'total', sort: true, type: 'price'}
    ],
    data: recentTransactions
  };
  
}
