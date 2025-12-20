import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { sidebar, todos } from '../../shared/data/todo';
import { Todo } from '../../shared/interface/todos';

@Component({
  selector: 'app-to-do',
  imports: [FormsModule, SidebarComponent],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})

export class ToDoComponent {

  public todos = todos;
  public taskValue: string = '';
  public todoSidebar = sidebar;

  ngOnInit() {
    this.getTodoCount();
  }

  getTodoCount() {
    this.todoSidebar.filter((item) => {
      if(item) {
        if(!item.count) {
          item.count = 0;
        }

        if(item.value == 'all') {
          item.count = this.todos.length
        } else if(item.value == 'completed') {
          item.count = this.todos.filter(todos => todos.status == 'completed').length
        } else if(item.value == 'pending') {
          item.count = this.todos.filter(todos => todos.status == 'pending').length
        } else if(item.value == 'in_progress') {
          item.count = this.todos.filter(todos => todos.status == 'in_progress').length
        }
      }
    })
  }

  updateStatus(event: any, todo: Todo) {
    const is_checked = event.target.checked;
    todo.status = is_checked ? 'completed' : 'in_progress';
    this.getTodoCount();
  }

  handleKeyPress(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTask();
    }
  }

  addTask() {
    if(this.taskValue) {
      this.todos.unshift({
        id: Math.floor(Math.random() * 999) + 1,
        task: this.taskValue,
        status: 'pending',
        date: new Date().toLocaleDateString()
      })
    }
    this.taskValue = '';
    this.getTodoCount();
  }

  deleteTask(todo: Todo) {
    this.todos = this.todos.filter(todos => todos.id !== todo.id); 
    this.getTodoCount();
  }
  
}
