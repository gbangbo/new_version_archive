import { Component } from '@angular/core';

import { ProjectDetailsTabComponent } from "./widgets/project-details-tab/project-details-tab.component";
import { ProjectDetailsHeaderComponent } from "./widgets/project-details-header/project-details-header.component";
import { ProjectSummaryComponent } from "./widgets/project-summary/project-summary.component";
import { ProjectStatusComponent } from "./widgets/project-status/project-status.component";
import { FinanceComponent } from "./widgets/finance/finance.component";
import { ProjectTeamComponent } from "./widgets/project-team/project-team.component";
import { AttachmentsComponent } from "./widgets/attachments/attachments.component";
import { ActivityComponent } from "./widgets/activity/activity.component";

@Component({
  selector: 'app-project-details',
  imports: [ProjectDetailsTabComponent, ProjectDetailsHeaderComponent, ProjectSummaryComponent,
            ProjectStatusComponent, FinanceComponent, ProjectTeamComponent, 
            AttachmentsComponent, ActivityComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})

export class ProjectDetailsComponent {

  public activeTab: string;

  handleActiveTab(value: string) {
    this.activeTab = value;
  }
  
}
