import { Component } from '@angular/core';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../shared/components/ui/svg-icon/svg-icon.component";
import { GeneralComponent } from "./widgets/general/general.component";
import { ActivationComponent } from "./widgets/activation/activation.component";
import { WalletPointsComponent } from "./widgets/wallet-points/wallet-points.component";
import { SellerCommissionComponent } from "./widgets/seller-commission/seller-commission.component";
import { RefundComponent } from "./widgets/refund/refund.component";
import { DeliveryComponent } from "./widgets/delivery/delivery.component";
import { PaymentMethodComponent } from "./widgets/payment-method/payment-method.component";
import { AnalyticsComponent } from "./widgets/analytics/analytics.component";
import { settingTabs } from '../../../shared/data/e-commerce-setting';

@Component({
  selector: 'app-ecommerce-setting',
  imports: [CardComponent, SvgIconComponent, GeneralComponent, ActivationComponent, 
            WalletPointsComponent, SellerCommissionComponent, RefundComponent,
            DeliveryComponent, PaymentMethodComponent, AnalyticsComponent],
  templateUrl: './ecommerce-setting.component.html',
  styleUrl: './ecommerce-setting.component.scss'
})

export class EcommerceSettingComponent {

  public activeTab = 'general';
  public settingTabs = settingTabs;

  handleTab(value: string) {
    this.activeTab = value;
  }

}
