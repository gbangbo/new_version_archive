import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { radarChart } from '../../../../shared/data/charts/apex-chart';

@Component({
  selector: 'app-radar-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.scss'
})

export class RadarChartComponent {

  public radarChart = radarChart;

}
