import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { activityLogs } from '../../../../../shared/data/dashboard/default';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-activity-log',
  imports: [CardComponent],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.scss'
})

export class ActivityLogComponent {

  public cardToggleOptions = cardToggleOptions1;
  public activityLogs = activityLogs;

}
