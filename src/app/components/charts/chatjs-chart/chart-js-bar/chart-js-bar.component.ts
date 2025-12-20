import { Component } from '@angular/core';
import { BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { BaseChartDirective, provideCharts } from 'ng2-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { barChart } from '../../../../shared/data/charts/chatjs-chart';

@Component({
  selector: 'app-chart-js-bar',
  imports: [BaseChartDirective, CardComponent],
  providers: [provideCharts({ registerables: [BarController,CategoryScale, LinearScale,BarElement] })],
  templateUrl: './chart-js-bar.component.html',
  styleUrl: './chart-js-bar.component.scss'
})

export class ChartJsBarComponent {

  public barChart = barChart;

}
