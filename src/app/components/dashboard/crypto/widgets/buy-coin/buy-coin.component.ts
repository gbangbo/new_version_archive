import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { currencyOptions } from '../../../../../shared/data/dashboard/crypto';
import { cardToggleOptions7 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-buy-coin',
  imports: [CardComponent],
  templateUrl: './buy-coin.component.html',
  styleUrl: './buy-coin.component.scss'
})

export class BuyCoinComponent {

  public cardToggleOption = cardToggleOptions7;
  public currencyOptions = currencyOptions;

}
