import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-simple-modal',
  imports: [OutsideDirective, FeatherIconComponent],
  templateUrl: './simple-modal.component.html',
  styleUrl: './simple-modal.component.scss'
})

export class SimpleModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();
  
  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
  
}
