import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { lineChart } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-line-chart',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})

export class LineChartComponent {

  public lineChart = lineChart;

}
