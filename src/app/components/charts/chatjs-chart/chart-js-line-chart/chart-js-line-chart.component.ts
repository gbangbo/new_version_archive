import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import * as chartData from '../../../../shared/data/charts/chatjs-chart';

@Component({
  selector: 'app-chart-js-line-chart',
  imports: [BaseChartDirective, CardComponent],
  templateUrl: './chart-js-line-chart.component.html',
  styleUrl: './chart-js-line-chart.component.scss'
})

export class ChartJsLineChartComponent {

  public lineChartOptions = chartData.lineChartOptions;
  public lineChartLabels = chartData.lineChartLabels;
  public lineChartType = chartData.lineChartType;
  public lineChartLegend = chartData.lineChartLegend;
  public lineChartData = chartData.lineChartData;

}
