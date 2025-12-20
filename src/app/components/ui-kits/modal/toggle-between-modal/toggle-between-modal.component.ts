import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-toggle-between-modal',
  imports: [RouterModule, CardComponent,OutsideDirective],
  templateUrl: './toggle-between-modal.component.html',
  styleUrl: './toggle-between-modal.component.scss'
})

export class ToggleBetweenModalComponent {

  public modalFirstOpen: boolean = false
  public modalSecondOpen: boolean = false

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  openFirstModal() {
    this.modalFirstOpen = true
  }

  openSecondModal() {
    this.modalSecondOpen = true
  }

  closeModal() {
    this.modalFirstOpen = false
    this.modalSecondOpen = false
  }
  
}
