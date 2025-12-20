import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { candleStickChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-candlestick-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './candlestick-chart.component.html',
  styleUrl: './candlestick-chart.component.scss'
})

export class CandlestickChartComponent {

  public candleStickChart = candleStickChart;

}
