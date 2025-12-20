import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { radialBarChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-radial-bar-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './radial-bar-chart.component.html',
  styleUrl: './radial-bar-chart.component.scss'
})

export class RadialBarChartComponent {

  public radialBarChart = radialBarChart;

}
