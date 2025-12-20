import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { myCurrency } from '../../../../../shared/data/dashboard/crypto';
import { MyCurrency } from '../../../../../shared/interface/dashboard/crypto';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-my-currency',
  imports: [CardComponent, TableComponent],
  templateUrl: './my-currency.component.html',
  styleUrl: './my-currency.component.scss'
})

export class MyCurrencyComponent {
  public cardToggleOption = cardToggleOptions1;
  public tableConfig: TableConfigs = {
    columns: [
      {
        title: 'Coin Name',
        field_value: 'currency_name',
        sort: true
      },
      { title: 'Price', field_value: 'price', sort: true, type: 'price' },
      {
        title: '24h Change',
        field_value: 'day_change',
        sort: true,
      },
      { title: 'Total Balance', field_value: 'total_balance', sort: true, type: 'price' },
      { title: 'Total Coin', field_value: 'total_coin', sort: true },
      { title: 'Action', field_value: 'is_trade', sort: true },
    ],
    
    data: [] as MyCurrency[]
  };
  
  constructor(private sanitizer: DomSanitizer) { }
  
  ngOnInit() {
    this.tableConfig.data = myCurrency.map((currency: MyCurrency) => {
      const formattedCurrency = { ...currency };

      const imageHTML = `<div class="flex items-center gap-2">
                                <div class="currency-icon ${currency.color}">
                                  <svg>
                                  <use href="assets/svg/icon-sprite.svg#${currency.currency_symbol}"></use>
                                  </svg>
                                </div>
                                <div>
                                  <h6 class="f-14 mb-0 leading-tight font-normal">${currency.currency_name}</h6>
                                </div>
                              </div>`;

      formattedCurrency.currency_name = this.sanitizer.bypassSecurityTrustHtml(imageHTML);

      formattedCurrency.day_change = `<div class="change-currency font-success"> 
                                       ${currency.day_change}
                                        </div>`;

      const buttonHTML = `<button class="btn button-primary">Trade</button>`;

      formattedCurrency.is_trade = this.sanitizer.bypassSecurityTrustHtml(buttonHTML)

      return formattedCurrency;
    });
  }

}
