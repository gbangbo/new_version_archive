import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { salesReportChart } from '../../../../../shared/data/dashboard/default';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-sales-report',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})

export class SalesReportComponent {

  public cardToggleOptions = cardToggleOptions1;
  public salesReportChart = salesReportChart;

}
