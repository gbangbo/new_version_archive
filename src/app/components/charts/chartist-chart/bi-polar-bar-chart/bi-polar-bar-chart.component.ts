import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { biPolarBarChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-bi-polar-bar-chart',
  imports: [ChartistModule, CardComponent],
  templateUrl: './bi-polar-bar-chart.component.html',
  styleUrl: './bi-polar-bar-chart.component.scss'
})

export class BiPolarBarChartComponent {

  public biPolarBarChart = biPolarBarChart;

}
