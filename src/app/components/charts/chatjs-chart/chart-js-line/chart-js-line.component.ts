import { Component } from '@angular/core';
import { Colors, LineController, LineElement, PointElement } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import * as chartData from '../../../../shared/data/charts/chatjs-chart';

@Component({
  selector: 'app-chart-js-line',
  imports: [BaseChartDirective, CardComponent],
  providers: [provideCharts({ registerables: [LineController,PointElement,LineElement,Colors] })],
  templateUrl: './chart-js-line.component.html',
  styleUrl: './chart-js-line.component.scss'
})

export class ChartJsLineComponent {

  public lineGraphOptions = chartData.lineGraphOptions;
  public lineGraphLabels = chartData.lineGraphLabels;
  public lineGraphType = chartData.lineGraphType;
  public lineGraphLegend = chartData.lineGraphLegend;
  public lineGraphData = chartData.lineGraphData;

}
