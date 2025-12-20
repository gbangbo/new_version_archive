import { Component } from '@angular/core';
import { ArcElement, DoughnutController } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import * as chartData from '../../../../shared/data/charts/chatjs-chart';

@Component({
  selector: 'app-chart-js-doughnut',
  imports: [BaseChartDirective, CardComponent],
  providers: [provideCharts({ registerables: [DoughnutController,ArcElement] })],
  templateUrl: './chart-js-doughnut.component.html',
  styleUrl: './chart-js-doughnut.component.scss'
})

export class ChartJsDoughnutComponent {

  public doughnutChartLabels = chartData.doughnutChartLabels;
  public doughnutChartData = chartData.doughnutChartData;
  public doughnutChartType = chartData.doughnutChartType;
  public doughnutChartColors = chartData.doughnutChartColors;
  public doughnutChartOptions = chartData.doughnutChartOptions;
  public doughnutChartLegend = chartData.doughnutChartLegend;

}
