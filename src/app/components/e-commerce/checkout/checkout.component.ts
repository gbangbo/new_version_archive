import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { CompletedComponent } from "./widgets/completed/completed.component";
import { InformationComponent } from "./widgets/information/information.component";
import { PaymentComponent } from "./widgets/payment/payment.component";
import { ShippingComponent } from "./widgets/shipping/shipping.component";
import { checkoutTabs, orderDetails } from '../../../shared/data/order';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, CardComponent, InformationComponent, ShippingComponent, PaymentComponent, CompletedComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  public activeTab: number = 1;
  public orderDetails = orderDetails;
  public checkoutTabs = checkoutTabs;

  constructor(public router: Router) {}

  handleStep(value: number) {
    if(value == -1) {
      this.activeTab = this.activeTab - 1;
    } else if(value == 1 && this.activeTab < this.checkoutTabs.length) {
      this.activeTab = this.activeTab + 1;
    }
  }

  placeOrder() {
    this.router.navigate(['/order/1'])
  }
  
}
