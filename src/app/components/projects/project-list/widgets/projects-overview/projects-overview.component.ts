import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { ProjectCostPerformanceComponent } from "./widgets/project-cost-performance/project-cost-performance.component";
import { ProjectProfessionalTeamComponent } from "./widgets/project-professional-team/project-professional-team.component";
import { ProjectRatingComponent } from "./widgets/project-rating/project-rating.component";
import { TotalProjectsComponent } from "./widgets/total-projects/total-projects.component";

@Component({
  selector: 'app-projects-overview',
  imports: [CardComponent, ProjectCostPerformanceComponent, ProjectRatingComponent, 
            ProjectProfessionalTeamComponent, TotalProjectsComponent],
  templateUrl: './projects-overview.component.html',
  styleUrl: './projects-overview.component.scss'
})

export class ProjectsOverviewComponent {

}
