import { Component, EventEmitter, Output } from '@angular/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { Select2Module, Select2UpdateEvent } from 'ng-select2-component';

import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { taskImportance, taskStatus } from '../../../../shared/data/tasks';
import { user } from '../../../../shared/data/user';

@Component({
  selector: 'app-sidebar',
  imports: [Select2Module, OwlDateTimeModule, OwlNativeDateTimeModule, FeatherIconComponent, AddTaskModalComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  @Output() selectedStatus = new EventEmitter();
  @Output() selectedImportance = new EventEmitter();

  public userDetails = user;
  public taskStatus = taskStatus;
  public taskImportance = taskImportance;
  public sidebarOpen: boolean = false;
  public modalOpen: boolean = false;

  handleTaskStatus(event: Select2UpdateEvent) {
    const value = event.value;
    this.selectedStatus.emit(value);
  }

  handleImportance(event: Select2UpdateEvent) {
    const value = event.value;
    this.selectedImportance.emit(value);
  }

  openModal() {
    this.modalOpen = true;
  }

  handleModalOpen(value: boolean) {
    this.modalOpen = value;
  }

  toggleFilter() {
    this.sidebarOpen =! this.sidebarOpen;
  }
  
}
