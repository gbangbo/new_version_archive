import { Component } from '@angular/core';

import { projectTeam } from '../../../../../../../shared/data/project';
import { TooltipComponent } from "../../../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-project-professional-team',
  imports: [TooltipComponent],
  templateUrl: './project-professional-team.component.html',
  styleUrl: './project-professional-team.component.scss'
})

export class ProjectProfessionalTeamComponent {

  public projectTeam = projectTeam;

}
