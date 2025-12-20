import { Component, HostListener } from '@angular/core';

import { BalanceComponent } from "../../../../dashboard/crypto/widgets/balance/balance.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-balance-modal',
  imports: [OutsideDirective, BalanceComponent],
  templateUrl: './balance-modal.component.html',
  styleUrl: './balance-modal.component.scss'
})

export class BalanceModalComponent {

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
