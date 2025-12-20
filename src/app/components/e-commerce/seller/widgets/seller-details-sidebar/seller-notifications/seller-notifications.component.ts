import { Component } from '@angular/core';

import { TooltipComponent } from "../../../../../../shared/components/ui/tooltip/tooltip.component";
import { sellerDetails } from '../../../../../../shared/data/store';

@Component({
  selector: 'app-seller-notifications',
  imports: [TooltipComponent],
  templateUrl: './seller-notifications.component.html',
  styleUrl: './seller-notifications.component.scss'
})

export class SellerNotificationsComponent {

  public notifications = sellerDetails.notifications;

}
