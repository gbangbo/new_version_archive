import { Component, HostListener } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-grid-modal',
  imports: [CardComponent,OutsideDirective],
  templateUrl: './grid-modal.component.html',
  styleUrl: './grid-modal.component.scss'
})

export class GridModalComponent {

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
