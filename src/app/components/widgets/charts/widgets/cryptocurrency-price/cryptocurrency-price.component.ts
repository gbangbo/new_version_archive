import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { cryptoCurrencyPriceChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-cryptocurrency-price',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './cryptocurrency-price.component.html',
  styleUrl: './cryptocurrency-price.component.scss'
})

export class CryptocurrencyPriceComponent {

  public cryptoCurrencyPriceChart = cryptoCurrencyPriceChart;

}
