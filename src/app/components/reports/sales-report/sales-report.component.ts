import { Component } from '@angular/core';

import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../shared/components/ui/table/table.component';
import { SalesReport } from '../../../shared/interface/reports';
import { TableConfigs } from '../../../shared/interface/common';
import { salesReport } from '../../../shared/data/reports';

@Component({
  selector: 'app-sales-report',
  imports: [CardComponent, TableComponent],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})

export class SalesReportComponent {

  public salesReport: SalesReport[];

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Order Month', field_value: 'order_month', sort: true },
      { title: 'Total Sales', field_value: 'total_sales', sort: true },
      { title: 'Average Order Value', field_value: 'average_order_value', sort: true },
      { title: 'Total Orders', field_value: 'total_orders', sort: true },
      { title: 'Growth Percentage', field_value: 'growth', sort: true },
    ],
    data: [] as SalesReport[]
  };

  ngOnInit() {
    this.tableConfig.data = salesReport;
  }
  
}
