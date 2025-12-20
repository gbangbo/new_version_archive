import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { modalContent } from '../../../../../shared/data/ui-kits/modal';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-scrolling-content-modal',
  imports: [CommonModule, OutsideDirective, FeatherIconComponent],
  templateUrl: './scrolling-content-modal.component.html',
  styleUrl: './scrolling-content-modal.component.scss'
})

export class ScrollingContentModalComponent {

  public modalContent = modalContent;
  
  @Output() modalOpen = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
  
}
