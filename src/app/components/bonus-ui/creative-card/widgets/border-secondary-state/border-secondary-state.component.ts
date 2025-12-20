import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { secondaryStateCard } from '../../../../../shared/data/bonus-ui/creative-cards';

@Component({
  selector: 'app-border-secondary-state',
  imports: [CardComponent],
  templateUrl: './border-secondary-state.component.html',
  styleUrl: './border-secondary-state.component.scss'
})

export class BorderSecondaryStateComponent {

  public secondaryStateCard = secondaryStateCard;

}
