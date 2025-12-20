import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { earnings } from '../../../../../shared/data/dashboard/e-commerce';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-payment-gateway-earning',
  imports: [CardComponent, SvgIconComponent],
  templateUrl: './payment-gateway-earning.component.html',
  styleUrl: './payment-gateway-earning.component.scss'
})

export class PaymentGatewayEarningComponent {

  public cardToggleOption = cardToggleOptions3;
  public earnings = earnings;

}
