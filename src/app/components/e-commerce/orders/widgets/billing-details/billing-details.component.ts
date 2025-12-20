import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { BillingDetails } from '../../../../../shared/interface/order';

@Component({
  selector: 'app-billing-details',
  imports: [CommonModule, RouterModule, CardComponent],
  templateUrl: './billing-details.component.html',
  styleUrl: './billing-details.component.scss'
})

export class BillingDetailsComponent {

  @Input() billing_details: BillingDetails;

}
