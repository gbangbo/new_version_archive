import { Component } from '@angular/core';

import { ChartJsBarComponent } from "./chart-js-bar/chart-js-bar.component";
import { ChartJsLineComponent } from "./chart-js-line/chart-js-line.component";
import { ChartJsRadarComponent } from "./chart-js-radar/chart-js-radar.component";
import { ChartJsLineChartComponent } from "./chart-js-line-chart/chart-js-line-chart.component";
import { ChartJsDoughnutComponent } from "./chart-js-doughnut/chart-js-doughnut.component";
import { ChartJsPolarComponent } from "./chart-js-polar/chart-js-polar.component";

@Component({
  selector: 'app-chatjs-chart',
  imports: [ChartJsBarComponent, ChartJsLineComponent, ChartJsRadarComponent,
            ChartJsLineChartComponent, ChartJsDoughnutComponent, ChartJsPolarComponent],
  templateUrl: './chatjs-chart.component.html',
  styleUrl: './chatjs-chart.component.scss'
})

export class ChatjsChartComponent {

}
