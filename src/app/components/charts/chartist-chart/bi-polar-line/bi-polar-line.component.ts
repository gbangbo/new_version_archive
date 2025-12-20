import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { biPolarLineChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-bi-polar-line',
  imports: [ChartistModule, CardComponent],
  templateUrl: './bi-polar-line.component.html',
  styleUrl: './bi-polar-line.component.scss'
})

export class BiPolarLineComponent {

  public biPolarLineChart = biPolarLineChart;

}
