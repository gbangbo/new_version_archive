import { Component } from '@angular/core';

import { totalProjects } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-total-projects',
  imports: [],
  templateUrl: './total-projects.component.html',
  styleUrl: './total-projects.component.scss'
})

export class TotalProjectsComponent {

  public totalProjects = totalProjects;
  
}
