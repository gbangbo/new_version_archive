import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { visitorChart } from '../../../../../shared/data/dashboard/default';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-visitors-chart',
  imports: [NgApexchartsModule, CardComponent, CounterComponent],
  templateUrl: './visitors-chart.component.html',
  styleUrl: './visitors-chart.component.scss'
})

export class VisitorsChartComponent {

  public cardToggleOptions = cardToggleOptions1;
  public visitorChart = visitorChart;

}
