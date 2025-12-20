import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { upcomingSchedule } from '../../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-upcoming-schedule',
  imports: [RouterModule, CardComponent, SvgIconComponent],
  templateUrl: './upcoming-schedule.component.html',
  styleUrl: './upcoming-schedule.component.scss'
})

export class UpcomingScheduleComponent {

  public upcomingSchedule = upcomingSchedule;

}
