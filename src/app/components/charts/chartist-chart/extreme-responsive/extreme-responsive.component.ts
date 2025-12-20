import { Component } from '@angular/core';
import { ChartistModule } from 'ng-chartist';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { extremeResponsiveChart } from '../../../../shared/data/charts/chartist-chart';

@Component({
  selector: 'app-extreme-responsive',
  imports: [ChartistModule, CardComponent],
  templateUrl: './extreme-responsive.component.html',
  styleUrl: './extreme-responsive.component.scss'
})

export class ExtremeResponsiveComponent {
  
  public extremeResponsiveChart = extremeResponsiveChart;

}
