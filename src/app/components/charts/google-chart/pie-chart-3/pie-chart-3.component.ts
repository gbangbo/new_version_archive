import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { pieChart3 } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-pie-chart-3',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './pie-chart-3.component.html',
  styleUrl: './pie-chart-3.component.scss'
})
export class PieChart3Component {

  public pieChart3 = pieChart3;

}
