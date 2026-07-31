import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../shared/components/ui/card/card.component";
import { TableComponent } from '../../shared/components/ui/table/table.component';
import { Task } from '../../shared/interface/tasks';
import { TaskService } from '../../shared/services/task.service';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';

@Component({
  selector: 'app-task',
  imports: [CommonModule, SidebarComponent, CardComponent, TableComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})

export class TaskComponent {

  public tasks: Task[];
  public filter = {
    status: '',
    importance: ''
  };
  
  constructor(public taskService: TaskService) { }
  
  ngOnInit() {
    document.body.classList.add('task-calendar');
  }

  ngOnDestroy() {
    document.body.classList.remove('task-calendar');
  }

}
