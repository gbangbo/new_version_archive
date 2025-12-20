import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CompletedComponent } from "../../../../e-commerce/checkout/widgets/completed/completed.component";
import { InformationComponent } from "../../../../e-commerce/checkout/widgets/information/information.component";
import { PaymentComponent } from "../../../../e-commerce/checkout/widgets/payment/payment.component";
import { ShippingComponent } from "../../../../e-commerce/checkout/widgets/shipping/shipping.component";
import { productDetails, productTotal, shippingForm } from '../../../../../shared/data/form-layout';

@Component({
  selector: 'app-shipping-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
            InformationComponent, ShippingComponent, PaymentComponent,
            CompletedComponent, CardComponent],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.scss'
})

export class ShippingFormComponent {

  public shippingForm = shippingForm;
  public productDetails = productDetails;
  public productTotal = productTotal;
  public activeTab: number = 1;

  handleStep(value: number) {
    if (value == -1) {
      this.activeTab = this.activeTab - 1;
    } else if (value == 1 && this.activeTab < this.shippingForm.length) {
      this.activeTab = this.activeTab + 1;
    } 
  }

  changeTab(tabId: number){
    if (tabId >= 1 && tabId <= this.shippingForm.length) {
      this.activeTab = tabId;
    }
  }

}
