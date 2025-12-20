import { Component } from '@angular/core';
import { RadarController, RadialLinearScale } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import * as chartData from '../../../../shared/data/charts/chatjs-chart';

@Component({
  selector: 'app-chart-js-radar',
  imports: [BaseChartDirective, CardComponent],
  providers: [provideCharts({ registerables: [RadarController,RadialLinearScale] })],
  templateUrl: './chart-js-radar.component.html',
  styleUrl: './chart-js-radar.component.scss'
})

export class ChartJsRadarComponent {

  public radarGraphOptions = chartData.radarGraphOptions;
  public radarGraphLabels = chartData.radarGraphLabels;
  public radarGraphType = chartData.radarGraphType;
  public radarGraphData = chartData.radarGraphData;

}
