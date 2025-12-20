import { Component } from '@angular/core';

import { TwoFactorAuthenticationModalComponent } from '../modal/two-factor-authentication-modal/two-factor-authentication-modal.component';

@Component({
  selector: 'app-two-factor-authentication',
  imports: [TwoFactorAuthenticationModalComponent],
  templateUrl: './two-factor-authentication.component.html',
  styleUrl: './two-factor-authentication.component.scss'
})

export class TwoFactorAuthenticationComponent {

  public modalOpen: boolean = false

  openModal() {
    this.modalOpen = true;
  }

  handleOpenModal(value: boolean) {
    this.modalOpen = value;
  }
  
}
