import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { stockReport } from '../../../../../shared/data/dashboard/e-commerce';
import { StockReport } from '../../../../../shared/interface/dashboard/e-commerce';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-stock-reports',
  imports: [CardComponent, TableComponent],
  templateUrl: './stock-reports.component.html',
  styleUrl: './stock-reports.component.scss'
})

export class StockReportsComponent {

  public cardToggleOption = cardToggleOptions3;
  
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Items', field_value: 'product_name', sort: true },
      { title: 'Product ID', field_value: 'product_id', sort: true },
      { title: 'QTY', field_value: 'quantity', sort: true, type: 'qty', text: 'PCS' },
      { title: 'Price', field_value: 'price', sort: true, type: 'price' },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    data: [] as StockReport[]
  };
  
  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToReport'] = () => {
      this.router.navigate(['/reports/products']);
    };

    this.tableConfig.data = stockReport.map((report: StockReport) => {
      const formattedReport = { ...report };
      formattedReport.product_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                              <div class="img-border">
                                <img class="max-w-full rounded-full" src="${report.product_image}" alt="user">
                              </div>
                              <a class="font-medium" href="javascript:void(0)" onclick="navigateToReport()">${report.product_name}</a>
                            </div>`);

      const statusHTML = `<button class="btn button-light-${report.color} txt-${report.color} font-medium">${report.status}</button>`;

      formattedReport.status = this.sanitizer.bypassSecurityTrustHtml(statusHTML)
      
      return formattedReport;
    });
  }

}
