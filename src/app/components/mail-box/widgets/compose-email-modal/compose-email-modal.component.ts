import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { OutsideDirective } from './../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-compose-email-modal',
  imports: [AngularEditorModule, OutsideDirective],
  templateUrl: './compose-email-modal.component.html',
  styleUrl: './compose-email-modal.component.scss'
})

export class ComposeEmailModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public fields = {
    cc: false,
    bcc: false,
  };

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  handleFields(value: string) {
    this.fields[value as 'cc' | 'bcc'] = !this.fields[value as 'cc' | 'bcc'];
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
  
}
