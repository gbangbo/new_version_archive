import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { pieChart1 } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-pie-chart-1',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './pie-chart-1.component.html',
  styleUrl: './pie-chart-1.component.scss'
})

export class PieChart1Component {

  public pieChart1 = pieChart1;

}
