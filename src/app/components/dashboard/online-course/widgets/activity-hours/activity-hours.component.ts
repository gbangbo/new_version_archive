import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { activityHoursChart } from '../../../../../shared/data/dashboard/online-course';
import { cardToggleOptions5 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-activity-hours',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './activity-hours.component.html',
  styleUrl: './activity-hours.component.scss'
})

export class ActivityHoursComponent {

  public activityHoursChart = activityHoursChart;
  public cardToggleOption = cardToggleOptions5;

}
