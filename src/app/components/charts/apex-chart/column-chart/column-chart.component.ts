import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { columnChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-column-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './column-chart.component.html',
  styleUrl: './column-chart.component.scss'
})

export class ColumnChartComponent {

  public columnChart = columnChart;

}
