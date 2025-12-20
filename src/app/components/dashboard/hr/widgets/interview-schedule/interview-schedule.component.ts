import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { interviewSchedule } from '../../../../../shared/data/dashboard/hr';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-interview-schedule',
  imports: [CardComponent],
  templateUrl: './interview-schedule.component.html',
  styleUrl: './interview-schedule.component.scss'
})

export class InterviewScheduleComponent {

  public cardToggleOption = cardToggleOptions1;
  public interviewSchedule = interviewSchedule;

}
