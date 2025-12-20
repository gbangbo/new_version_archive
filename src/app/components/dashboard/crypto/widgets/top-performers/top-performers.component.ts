import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { topPerformers } from '../../../../../shared/data/dashboard/crypto';
import { TopPerformers } from '../../../../../shared/interface/dashboard/crypto';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-top-performers',
  imports: [CardComponent, TableComponent],
  templateUrl: './top-performers.component.html',
  styleUrl: './top-performers.component.scss'
})

export class TopPerformersComponent {

  public cardToggleOption = cardToggleOptions1;
  public topPerformers = topPerformers;
  
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Cryptocurrency', field_value: 'currency_name', sort: true },
      { title: 'Total Market Cap', field_value: 'market_cap', sort: true },
      { title: 'USD', field_value: 'usd', sort: true },
      { title: 'ETH', field_value: 'eth', sort: true,},
      { title: 'BTC', field_value: 'btc', sort: true },
      { title: 'Change (24h)', field_value: 'change24h', sort: true }
    ],
    data: [] as TopPerformers[]
  };
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.tableConfig.data = topPerformers.map((topPerformers: TopPerformers) => {
      const formattedPerformers = { ...topPerformers };

      const imageHTML = `<div class="flex items-center gap-2">
                           <div class="currency-icon ${topPerformers.bg_color}">
                              <svg>
                                    <use href="assets/svg/icon-sprite.svg#${topPerformers.currency_symbol}"></use>
                                 </svg>
                          </div>
                          <div>
                            <h6 class="f-14 mb-0 leading-tight font-normal">${topPerformers.currency_name}</h6>
                          </div>
                        </div>`;

      formattedPerformers.currency_name = this.sanitizer.bypassSecurityTrustHtml(imageHTML);
      
      return formattedPerformers;
    });
  }

}
