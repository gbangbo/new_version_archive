import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { allVisitsChart } from '../../../../../shared/data/widgets/general';
import { cardToggleOptions2 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-all-visits',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './all-visits.component.html',
  styleUrl: './all-visits.component.scss'
})

export class AllVisitsComponent {

  public allVisitsChart = allVisitsChart;
  public cardToggleOption = cardToggleOptions2;

}
