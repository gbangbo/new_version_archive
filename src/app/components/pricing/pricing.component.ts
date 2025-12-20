import { Component } from '@angular/core';

import { CardComponent } from "../../shared/components/ui/card/card.component";
import { becomeMember, simplePricingCard } from '../../shared/data/pricing';

@Component({
  selector: 'app-pricing',
  imports: [CardComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})

export class PricingComponent {

  public becomeMember = becomeMember;
  public simplePricingCard = simplePricingCard;

}
