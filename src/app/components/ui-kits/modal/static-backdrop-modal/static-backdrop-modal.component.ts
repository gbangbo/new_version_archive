import { Component, HostListener } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-static-backdrop-modal',
  imports: [CardComponent],
  templateUrl: './static-backdrop-modal.component.html',
  styleUrl: './static-backdrop-modal.component.scss'
})

export class StaticBackdropModalComponent {

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
