import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { projectDetails } from '../../../../../shared/data/project';

@Component({
  selector: 'app-project-team',
  imports: [CommonModule, CardComponent],
  templateUrl: './project-team.component.html',
  styleUrl: './project-team.component.scss'
})

export class ProjectTeamComponent {

  public projectTeam = projectDetails.team;

}
