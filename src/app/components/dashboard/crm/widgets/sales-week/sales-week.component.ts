import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { salesWeekChart } from '../../../../../shared/data/dashboard/crm';

@Component({
  selector: 'app-sales-week',
  imports: [NgApexchartsModule],
  templateUrl: './sales-week.component.html',
  styleUrl: './sales-week.component.scss'
})

export class SalesWeekComponent {

  public salesWeekChart = salesWeekChart;

}
