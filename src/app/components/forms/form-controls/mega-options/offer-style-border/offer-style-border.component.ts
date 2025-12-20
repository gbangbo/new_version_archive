import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { offerStyleBorder } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-offer-style-border',
  imports: [CardComponent],
  templateUrl: './offer-style-border.component.html',
  styleUrl: './offer-style-border.component.scss'
})

export class OfferStyleBorderComponent {

  public offerStyleBorder = offerStyleBorder;

}
