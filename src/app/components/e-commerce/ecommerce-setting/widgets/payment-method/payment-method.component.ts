import { Component } from '@angular/core';

import { paymentTabs } from '../../../../../shared/data/e-commerce-setting';

@Component({
  selector: 'app-payment-method',
  imports: [],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})

export class PaymentMethodComponent {

  public activeTab = 'paypal';
  public settingTabs = paymentTabs;

  handleTab(value: string) {
    this.activeTab = value;
  }

}
