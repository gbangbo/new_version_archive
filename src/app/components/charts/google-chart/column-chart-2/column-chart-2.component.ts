import { Component } from '@angular/core';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { columnChart2 } from '../../../../shared/data/charts/google-chart';

@Component({
  selector: 'app-column-chart-2',
  imports: [CardComponent,Ng2GoogleChartsModule],
  templateUrl: './column-chart-2.component.html',
  styleUrl: './column-chart-2.component.scss'
})

export class ColumnChart2Component {

  public columnChart2 = columnChart2;

}
