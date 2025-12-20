import { Component } from '@angular/core';

import { AddressModalComponent } from '../../../../../shared/components/ui/modal/address-modal/address-modal.component';
import { user } from '../../../../../shared/data/user';

@Component({
  selector: 'app-shipping',
  imports: [AddressModalComponent],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss'
})

export class ShippingComponent {

  public userDetails = user;
  public modalOpen: boolean = false;

  openAddressModal() {
    this.modalOpen = true;
  }

  handleModalOpen(value: boolean) {
    this.modalOpen = value;
  }
  
}
