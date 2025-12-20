import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { areaChart2 } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-area-chart-2',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './area-chart-2.component.html',
  styleUrl: './area-chart-2.component.scss'
})

export class AreaChart2Component {

  public areaChart2 = areaChart2;

}
