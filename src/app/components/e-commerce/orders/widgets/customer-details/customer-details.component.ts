import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CustomerDetails } from '../../../../../shared/interface/order';

@Component({
  selector: 'app-customer-details',
  imports: [CardComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})

export class CustomerDetailsComponent {

  @Input() customer_details: CustomerDetails;

}
