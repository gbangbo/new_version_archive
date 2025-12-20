import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { primaryStateCard } from '../../../../../shared/data/bonus-ui/creative-cards';

@Component({
  selector: 'app-border-primary-state',
  imports: [CardComponent],
  templateUrl: './border-primary-state.component.html',
  styleUrl: './border-primary-state.component.scss'
})

export class BorderPrimaryStateComponent {

  public primaryStateCard = primaryStateCard;

}
