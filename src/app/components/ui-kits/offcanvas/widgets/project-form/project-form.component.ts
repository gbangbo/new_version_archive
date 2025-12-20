import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select2Data, Select2Module } from 'ng-select2-component';

import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, Select2Module, OutsideDirective],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})

export class ProjectFormComponent {

  @Input() title: string;
  @Input() positionClass: string;
  @Input() outsideClick: boolean = true;
  
  @Output() closeOffcanvas = new EventEmitter<boolean>();

  public projects: Select2Data = [
    { value: 'Project1', label: 'Project1' },
    { value: 'Project2', label: 'Project2' },
    { value: 'Project3', label: 'Project3' }
  ]

  public projectCount: Select2Data = [
    { value: 'One', label: 'One' },
    { value: 'Two', label: 'Two' },
    { value: 'Three', label: 'Three' }
  ]

  close() {
    this.closeOffcanvas.emit(false);
  }
  
}
