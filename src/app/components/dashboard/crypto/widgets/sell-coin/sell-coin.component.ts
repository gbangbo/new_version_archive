import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { currencyOptions } from '../../../../../shared/data/dashboard/crypto';
import { cardToggleOptions7 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-sell-coin',
  imports: [CardComponent],
  templateUrl: './sell-coin.component.html',
  styleUrl: './sell-coin.component.scss'
})

export class SellCoinComponent {

  public cardToggleOption = cardToggleOptions7;
  public currencyOptions = currencyOptions;

}
