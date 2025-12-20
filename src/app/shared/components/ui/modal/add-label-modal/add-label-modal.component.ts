import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { OutsideDirective } from '../../../../directives/outside.directive';

@Component({
  selector: 'app-add-label-modal',
  imports: [OutsideDirective],
  templateUrl: './add-label-modal.component.html',
  styleUrl: './add-label-modal.component.scss'
})

export class AddLabelModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
  
}
