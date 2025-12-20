import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { monthlyTargetChart } from '../../../../../shared/data/dashboard/default';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-monthly-target',
  imports: [NgApexchartsModule, CardComponent, FeatherIconComponent],
  templateUrl: './monthly-target.component.html',
  styleUrl: './monthly-target.component.scss'
})

export class MonthlyTargetComponent {

  public cardToggleOptions = cardToggleOptions1;
  public monthlyTargetChart = monthlyTargetChart;

}
