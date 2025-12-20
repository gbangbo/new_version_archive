import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { stepLineChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-stepline-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './stepline-chart.component.html',
  styleUrl: './stepline-chart.component.scss'
})

export class SteplineChartComponent {

  public stepLineChart = stepLineChart;

}
