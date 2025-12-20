import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { svgPathChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-svg-path-animation',
  imports: [ChartistModule, CardComponent],
  templateUrl: './svg-path-animation.component.html',
  styleUrl: './svg-path-animation.component.scss'
})

export class SvgPathAnimationComponent {

  public svgPathChart = svgPathChart;

}
