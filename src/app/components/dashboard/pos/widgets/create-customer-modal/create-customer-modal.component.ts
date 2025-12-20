import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-create-customer-modal',
  imports: [OutsideDirective],
  templateUrl: './create-customer-modal.component.html',
  styleUrl: './create-customer-modal.component.scss'
})

export class CreateCustomerModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
}
