import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardDropdownButtonComponent } from "../../../../../shared/components/ui/card/card-dropdown-button/card-dropdown-button.component";
import { incomeChart } from '../../../../../shared/data/dashboard/nft';
import { cardToggleOptions7 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-income-chart',
  imports: [NgApexchartsModule, CardDropdownButtonComponent],
  templateUrl: './income-chart.component.html',
  styleUrl: './income-chart.component.scss'
})
export class IncomeChartComponent {

  public cardToggleOption = cardToggleOptions7;
  public incomeChart = incomeChart;
  
}
