import { Component, HostListener } from '@angular/core';

import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-result-modal',
  imports: [OutsideDirective],
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.scss'
})

export class ResultModalComponent {

  public modalOpen: boolean = false

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  openModal() {
    this.modalOpen = true
  }

  closeModal() {
    this.modalOpen = false
  }

}
