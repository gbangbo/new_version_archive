import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { columnChart2 } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-column-annotation-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './column-annotation-chart.component.html',
  styleUrl: './column-annotation-chart.component.scss'
})

export class ColumnAnnotationChartComponent {

  public columnChart = columnChart2;

}
