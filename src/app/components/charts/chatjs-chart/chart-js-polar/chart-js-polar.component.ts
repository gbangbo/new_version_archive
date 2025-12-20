import { Component } from '@angular/core';
import { PolarAreaController } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import * as chartData from '../../../../shared/data/charts/chatjs-chart';

@Component({
  selector: 'app-chart-js-polar',
  imports: [BaseChartDirective, CardComponent],
  providers: [provideCharts({ registerables: [PolarAreaController] })],
  templateUrl: './chart-js-polar.component.html',
  styleUrl: './chart-js-polar.component.scss'
})

export class ChartJsPolarComponent {

  public polarChartLabels = chartData.polarChartLabels;
  public polarChartData = chartData.polarChartData;
  public polarChartType = chartData.polarChartType;
  public polarChartColors = chartData.polarChartColors;
  public polarChartOptions = chartData.polarChartOptions;
  public polarChartLegend = chartData.polarChartLegend;
}
