import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { areaSpalineChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-area-spaline-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './area-spaline-chart.component.html',
  styleUrl: './area-spaline-chart.component.scss'
})

export class AreaSpalineChartComponent {

  public areaSpalineChart = areaSpalineChart;

}
