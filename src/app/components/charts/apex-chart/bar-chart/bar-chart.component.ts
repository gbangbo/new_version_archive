import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { barChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-bar-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})

export class BarChartComponent {

  public barChart = barChart;

}
