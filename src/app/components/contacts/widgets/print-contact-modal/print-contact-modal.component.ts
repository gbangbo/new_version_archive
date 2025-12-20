import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';

import { OutsideDirective } from '../../../../shared/directives/outside.directive';
import { Contact } from '../../../../shared/interface/contacts';

@Component({
  selector: 'app-print-contact-modal',
  imports: [NgxPrintModule, OutsideDirective],
  templateUrl: './print-contact-modal.component.html',
  styleUrl: './print-contact-modal.component.scss'
})

export class PrintContactModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  @Input() activeContact: Contact;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
  
}
