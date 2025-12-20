import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { averageSalePrice } from '../../../../../shared/data/dashboard/crypto';
import { AverageSalePrice } from '../../../../../shared/interface/dashboard/crypto';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-average-sale-price',
  imports: [CardComponent, TableComponent],
  templateUrl: './average-sale-price.component.html',
  styleUrl: './average-sale-price.component.scss'
})

export class AverageSalePriceComponent {

  public cardToggleOption = cardToggleOptions1;
  public averageSalePrice = averageSalePrice;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Cryptocurrency', field_value: 'currency_name', sort: true },
      { title: 'USD', field_value: 'usd', sort: true },
      { title: 'ETH', field_value: 'eth', sort: true, },
      { title: 'BTC', field_value: 'btc', sort: true },
      { title: 'Price Change(%)', field_value: 'price_change', sort: true }
    ],
    data: [] as AverageSalePrice[]
  };
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.tableConfig.data = averageSalePrice.map((sale: AverageSalePrice) => {
      const formattedSale = { ...sale };

      const imageHTML = `<div class="flex items-center gap-2">
                      <div class="currency-icon ${sale.bg_color}">
                        <svg>
                          <use href="assets/svg/icon-sprite.svg#${sale.currency_symbol}"></use>
                        </svg>
                      </div>
                      <div> 
                        <h6 class="f-14 mb-0 leading-tight font-normal">${sale.currency_name}</h6>
                      </div>
                    </div>`;

      formattedSale.currency_name = this.sanitizer.bypassSecurityTrustHtml(imageHTML)
      
      return formattedSale;
    });
  }

}

