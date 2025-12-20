import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { barChart } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-bar-chart-2',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './bar-chart-2.component.html',
  styleUrl: './bar-chart-2.component.scss'
})

export class BarChart2Component {

  public barChart = barChart;

}
