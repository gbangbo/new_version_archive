import { Component } from '@angular/core';

import { ProjectsOverviewComponent } from "./widgets/projects-overview/projects-overview.component";
import { ProjectsTabComponent } from "./widgets/projects/projects-tab/projects-tab.component";
import { ProjectsComponent } from "./widgets/projects/projects/projects.component";

@Component({
  selector: 'app-project-list',
  imports: [ProjectsOverviewComponent, ProjectsTabComponent, ProjectsComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})

export class ProjectListComponent {

  public activeTab: string;

  handleActiveTab(value: string) {
    this.activeTab = value;
  }
  
}
