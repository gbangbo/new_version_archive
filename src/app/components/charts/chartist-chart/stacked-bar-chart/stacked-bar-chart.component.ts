import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { stackedBarChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-stacked-bar-chart',
  imports: [ChartistModule, CardComponent],
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.scss'
})

export class StackedBarChartComponent {

  public stackedBarChart = stackedBarChart;

}
