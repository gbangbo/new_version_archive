import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { basicChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-basic-area-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './basic-area-chart.component.html',
  styleUrl: './basic-area-chart.component.scss'
})

export class BasicAreaChartComponent {

  public basicChart = basicChart;

}
