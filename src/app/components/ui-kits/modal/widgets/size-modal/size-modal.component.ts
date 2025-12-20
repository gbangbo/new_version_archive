import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-size-modal',
  imports: [OutsideDirective, FeatherIconComponent],
  templateUrl: './size-modal.component.html',
  styleUrl: './size-modal.component.scss'
})

export class SizeModalComponent {

  @Input() title: string;
  @Input() class: string;
  @Input() buttons: boolean = false;
  
  @Output() modalOpen = new EventEmitter<boolean>();
  
  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  
}
