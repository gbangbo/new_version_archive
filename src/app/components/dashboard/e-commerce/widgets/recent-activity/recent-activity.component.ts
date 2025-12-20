import { Component } from '@angular/core';

import { recentActivity } from '../../../../../shared/data/dashboard/e-commerce';

@Component({
  selector: 'app-recent-activity',
  imports: [],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss'
})
export class RecentActivityComponent {

  public recentActivity = recentActivity;

}
