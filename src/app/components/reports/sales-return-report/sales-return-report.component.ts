import { Component } from '@angular/core';

import { CardComponent } from '../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../shared/components/ui/table/table.component';
import { salesReturnReport } from '../../../shared/data/reports';
import { TableConfigs } from '../../../shared/interface/common';
import { SalesReturnReport } from '../../../shared/interface/reports';

@Component({
  selector: 'app-sales-return-report',
  imports: [CardComponent, TableComponent],
  templateUrl: './sales-return-report.component.html',
  styleUrl: './sales-return-report.component.scss'
})

export class SalesReturnReportComponent {

  public salesReport: SalesReturnReport[];
  
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Month', field_value: 'month', sort: true },
      { title: 'Total Items', field_value: 'total_item', sort: true },
      { title: 'Ordered', field_value: 'order', sort: true },
      { title: 'Returned', field_value: 'return', sort: true },
      { title: 'Reason of Return', field_value: 'reason', sort: true },
      { title: 'Total Replace', field_value: 'total_replace', sort: true },
      { title: 'Total Return', field_value: 'total_return', sort: true, type: 'price' },
    ],
    data: [] as SalesReturnReport[]
  };

  ngOnInit() {
    this.tableConfig.data = salesReturnReport;
  }

}
