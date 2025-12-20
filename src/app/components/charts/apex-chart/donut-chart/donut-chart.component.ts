import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { donutChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-donut-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss'
})

export class DonutChartComponent {

  public donutChart = donutChart;

}
