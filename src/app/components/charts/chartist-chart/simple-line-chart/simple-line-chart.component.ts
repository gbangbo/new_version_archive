import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { simpleLineChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-simple-line-chart',
  imports: [ChartistModule, CardComponent],
  templateUrl: './simple-line-chart.component.html',
  styleUrl: './simple-line-chart.component.scss'
})

export class SimpleLineChartComponent {

  public simpleLineChart = simpleLineChart;

}
