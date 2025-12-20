import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { horizontalBarChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-horizontal-bar-chart',
  imports: [ChartistModule, CardComponent],
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrl: './horizontal-bar-chart.component.scss'
})

export class HorizontalBarChartComponent {

  public horizontalBarChart = horizontalBarChart;

}
