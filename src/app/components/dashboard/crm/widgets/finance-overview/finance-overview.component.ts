import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { financeOverviewChart } from '../../../../../shared/data/dashboard/crm';
import { cardToggleOptions5 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-finance-overview',
  imports: [NgApexchartsModule, CardComponent, CounterComponent],
  templateUrl: './finance-overview.component.html',
  styleUrl: './finance-overview.component.scss'
})

export class FinanceOverviewComponent {

  public financeOverviewChart = financeOverviewChart;
  public cardToggleOption = cardToggleOptions5;

}
