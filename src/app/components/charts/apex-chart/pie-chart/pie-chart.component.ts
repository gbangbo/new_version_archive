import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { pieChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-pie-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent {

  public pieChart = pieChart;

}
