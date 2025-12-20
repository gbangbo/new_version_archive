import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { lineAreaChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-line-chart-area',
  imports: [ChartistModule, CardComponent],
  templateUrl: './line-chart-area.component.html',
  styleUrl: './line-chart-area.component.scss'
})

export class LineChartAreaComponent {

  public lineAreaChart = lineAreaChart;

}
