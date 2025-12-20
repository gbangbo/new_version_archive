import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { pieChart2 } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-pie-chart-2',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './pie-chart-2.component.html',
  styleUrl: './pie-chart-2.component.scss'
})
export class PieChart2Component {

  public pieChart2 = pieChart2;

}
