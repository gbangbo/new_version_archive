import { Component } from '@angular/core';

import { CardComponent } from '../../../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from "../../../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { projectDetails } from '../../../../../../../shared/data/project';
import { TooltipComponent } from "../../../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-team-member',
  imports: [CardComponent, SvgIconComponent, TooltipComponent],
  templateUrl: './team-member.component.html',
  styleUrl: './team-member.component.scss'
})

export class TeamMemberComponent {

  public teamMembers = projectDetails.project_summary.team_members;

}
