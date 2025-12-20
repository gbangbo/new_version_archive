import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { CreateCustomerModalComponent } from '../create-customer-modal/create-customer-modal.component';
import { checkoutMethod } from '../../../../../shared/data/dashboard/pos';
import { CartService } from '../../../../../shared/services/cart.service';

@Component({
  selector: 'app-pos-checkout',
  imports: [RouterModule, CommonModule, FeatherIconComponent, CreateCustomerModalComponent],
  templateUrl: './pos-checkout.component.html',
  styleUrl: './pos-checkout.component.scss'
})

export class PosCheckoutComponent {

  public checkoutMethod = checkoutMethod;
  public modalOpen: boolean = false;

  constructor(public cartService: CartService) {}

  openModal() {
    this.modalOpen = true;
  }

  handleOpenModal(value: boolean) {
    this.modalOpen = value;
  }
}
