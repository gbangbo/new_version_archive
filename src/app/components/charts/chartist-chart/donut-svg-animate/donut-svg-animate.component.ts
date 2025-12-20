import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { donutSVGChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-donut-svg-animate',
  imports: [ChartistModule, CardComponent],
  templateUrl: './donut-svg-animate.component.html',
  styleUrl: './donut-svg-animate.component.scss'
})

export class DonutSvgAnimateComponent {

  public donutSVGChart = donutSVGChart;

}
