import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { totalUsersChart } from '../../../../../shared/data/widgets/general';

@Component({
  selector: 'app-total-users',
  imports: [NgApexchartsModule, SvgIconComponent, FeatherIconComponent],
  templateUrl: './total-users.component.html',
  styleUrl: './total-users.component.scss'
})

export class TotalUsersComponent {

  public totalUsersChart = totalUsersChart;

}
