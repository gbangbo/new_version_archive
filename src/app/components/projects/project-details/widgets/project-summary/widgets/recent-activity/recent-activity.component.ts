import { Component } from '@angular/core';

import { CardComponent } from '../../../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from "../../../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { Activities } from '../../../../../../../shared/interface/project';
import { projectDetails } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-recent-activity',
  imports: [CardComponent, SvgIconComponent],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss'
})

export class RecentActivityComponent {

  public recentActivity = projectDetails.project_summary.recent_activity;
  public activeTab: string = this.recentActivity.activities[0].date;

  handleTab(activity: Activities) {
    this.activeTab = activity.date
  }
  
}
