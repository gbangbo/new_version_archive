import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../../shared/components/ui/card/card.component";
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { projects } from '../../../../../../shared/data/project';
import { Projects } from '../../../../../../shared/interface/project';
import { ChatService } from '../../../../../../shared/services/chat.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, CardComponent, ProjectDetailsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {

  @Input() activeTab: string;

  public projects = projects;
  public filteredProject: Projects[];

  constructor(public chatService: ChatService) {}
  
  ngOnChanges() {
    if(this.activeTab && this.activeTab == 'all') {
      this.filteredProject = projects;
    } else {
      this.filteredProject = this.projects.filter(project => project.status === this.activeTab);
    }
  }

}
