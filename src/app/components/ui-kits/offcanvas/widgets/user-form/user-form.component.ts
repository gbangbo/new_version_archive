import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, OutsideDirective],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})

export class UserFormComponent {
  
  @Output() closeOffcanvas = new EventEmitter<boolean>();
  
  @Input() title: string;
  @Input() positionClass: string;

  close() {
    this.closeOffcanvas.emit(false);
  }

}
