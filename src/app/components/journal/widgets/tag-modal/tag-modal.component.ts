import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-tag-modal',
  imports: [OutsideDirective],
  templateUrl: './tag-modal.component.html',
  styleUrl: './tag-modal.component.scss'
})

export class TagModalComponent {
  
  @Output() modalOpen = new EventEmitter<boolean>();

  public closeResult: string;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
  
  ngOnDestroy() {
    if (this.modalOpen) {
      this.closeModal();
    }
  }
  
}
