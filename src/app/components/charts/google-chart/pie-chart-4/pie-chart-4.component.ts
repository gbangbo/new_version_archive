import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { pieChart4 } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-pie-chart-4',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './pie-chart-4.component.html',
  styleUrl: './pie-chart-4.component.scss'
})

export class PieChart4Component {

  public pieChart4 = pieChart4;

}
