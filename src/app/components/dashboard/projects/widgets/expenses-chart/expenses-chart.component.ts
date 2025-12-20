import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { ExpensesChart } from '../../../../../shared/interface/dashboard/projects';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";

@Component({
  selector: 'app-expenses-chart',
  imports: [CardComponent, NgApexchartsModule, FeatherIconComponent, CounterComponent],
  templateUrl: './expenses-chart.component.html',
  styleUrl: './expenses-chart.component.scss'
})

export class ExpensesChartComponent {

  @Input() chart: ExpensesChart;

  public cardToggleOption = cardToggleOptions3;

}
