import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-common-line-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './common-line-chart.component.html',
  styleUrl: './common-line-chart.component.scss'
})

export class CommonLineChartComponent {

  @Input() chart_details: any;

}
