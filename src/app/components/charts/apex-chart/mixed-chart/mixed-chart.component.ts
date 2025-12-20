import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { mixChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-mixed-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './mixed-chart.component.html',
  styleUrl: './mixed-chart.component.scss'
})

export class MixedChartComponent {

  public mixChart = mixChart;

}
