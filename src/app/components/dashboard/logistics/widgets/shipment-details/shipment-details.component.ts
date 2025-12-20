import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { shipmentDetails } from '../../../../../shared/data/dashboard/logistics';

@Component({
  selector: 'app-shipment-details',
  imports: [CardComponent],
  templateUrl: './shipment-details.component.html',
  styleUrl: './shipment-details.component.scss'
})

export class ShipmentDetailsComponent {

  public cardToggleOption = cardToggleOptions3;
  public shipmentDetails = shipmentDetails;

}
