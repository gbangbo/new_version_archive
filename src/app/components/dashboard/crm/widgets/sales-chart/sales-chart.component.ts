import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardDropdownButtonComponent } from '../../../../../shared/components/ui/card/card-dropdown-button/card-dropdown-button.component';
import { salesChart } from '../../../../../shared/data/dashboard/crm';
import { cardToggleOptions5 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-sales-chart',
  imports: [NgApexchartsModule, CardDropdownButtonComponent],
  templateUrl: './sales-chart.component.html',
  styleUrl: './sales-chart.component.scss'
})

export class SalesChartComponent {

  public salesChart = salesChart;
  public cardToggleOption = cardToggleOptions5;

}
