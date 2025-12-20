import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { comboChart } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-combo-chart',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './combo-chart.component.html',
  styleUrl: './combo-chart.component.scss'
})

export class ComboChartComponent {

  public comboChart = comboChart;

}
