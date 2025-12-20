import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { areaChart1 } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-area-chart-1',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './area-chart-1.component.html',
  styleUrl: './area-chart-1.component.scss'
})

export class AreaChart1Component {

  public areaChart1 = areaChart1;

}
