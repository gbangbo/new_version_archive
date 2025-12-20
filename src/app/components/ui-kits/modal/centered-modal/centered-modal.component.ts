import { Component, HostListener } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-centered-modal',
  imports: [CardComponent, OutsideDirective],
  templateUrl: './centered-modal.component.html',
  styleUrl: './centered-modal.component.scss'
})

export class CenteredModalComponent {

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
