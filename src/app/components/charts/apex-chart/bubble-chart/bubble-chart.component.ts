import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { bubbleChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-bubble-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './bubble-chart.component.html',
  styleUrl: './bubble-chart.component.scss'
})

export class BubbleChartComponent {

  public bubbleChart = bubbleChart;

}
