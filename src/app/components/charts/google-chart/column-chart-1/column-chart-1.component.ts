import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { columnChart1 } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-column-chart-1',
  imports: [Ng2GoogleChartsModule, CardComponent],
  templateUrl: './column-chart-1.component.html',
  styleUrl: './column-chart-1.component.scss'
})

export class ColumnChart1Component {

  public columnChart1 = columnChart1;

}
