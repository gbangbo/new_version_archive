import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { stockMarketChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-stock-market',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './stock-market.component.html',
  styleUrl: './stock-market.component.scss'
})

export class StockMarketComponent {

  public stockMarketChart = stockMarketChart;

}
