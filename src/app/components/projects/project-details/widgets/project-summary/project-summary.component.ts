import { Component } from '@angular/core';

import { ProjectDetailComponent } from "./widgets/project-detail/project-detail.component";
import { ProjectToDoComponent } from "./widgets/project-to-do/project-to-do.component";
import { PendingProjectsComponent } from "./widgets/pending-projects/pending-projects.component";
import { TaskOverviewComponent } from "./widgets/task-overview/task-overview.component";
import { RecentActivityComponent } from './widgets/recent-activity/recent-activity.component';
import { TeamMemberComponent } from "./widgets/team-member/team-member.component";
import { CommentsComponent } from "./widgets/comments/comments.component";

@Component({
  selector: 'app-project-summary',
  imports: [ProjectDetailComponent, ProjectToDoComponent, PendingProjectsComponent,
            TaskOverviewComponent, RecentActivityComponent, TeamMemberComponent, 
            CommentsComponent],
  templateUrl: './project-summary.component.html',
  styleUrl: './project-summary.component.scss'
})

export class ProjectSummaryComponent {

}
