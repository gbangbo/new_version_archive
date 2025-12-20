import { Component } from '@angular/core';

import { CardComponent } from "../../../../../../../shared/components/ui/card/card.component";
import { CardDropdownButtonComponent } from '../../../../../../../shared/components/ui/card/card-dropdown-button/card-dropdown-button.component';
import { projectDetails, todoListColors, todoStatus } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-project-to-do',
  imports: [CardComponent, CardDropdownButtonComponent],
  templateUrl: './project-to-do.component.html',
  styleUrl: './project-to-do.component.scss'
})

export class ProjectToDoComponent {

  public projectTodo = projectDetails.project_summary.todo_list;
  public colors = todoListColors;
  public todoStatus = todoStatus;

  getColor(index: number) {
    return this.colors[index % this.colors.length];
  }
  
}
