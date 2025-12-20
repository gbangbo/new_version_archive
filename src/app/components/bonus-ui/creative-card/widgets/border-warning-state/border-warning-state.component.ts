import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { warningStateCard } from '../../../../../shared/data/bonus-ui/creative-cards';

@Component({
  selector: 'app-border-warning-state',
  imports: [CardComponent],
  templateUrl: './border-warning-state.component.html',
  styleUrl: './border-warning-state.component.scss'
})

export class BorderWarningStateComponent {

  public warningStateCard = warningStateCard;

}
