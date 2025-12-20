import { Component } from '@angular/core';

import { DetailsCardComponent } from "./widgets/details-card/details-card.component";
import { AverageDayDetailsComponent } from './widgets/average-day-details/average-day-details.component';
import { TransactionsComponent } from "./widgets/transactions/transactions.component";
import { CurrencyChartComponent } from "./widgets/currency-chart/currency-chart.component";
import { MarketGraphComponent } from "./widgets/market-graph/market-graph.component";
import { MyCurrencyComponent } from "./widgets/my-currency/my-currency.component";
import { BuyCoinComponent } from "./widgets/buy-coin/buy-coin.component";
import { SellCoinComponent } from './widgets/sell-coin/sell-coin.component';
import { BalanceComponent } from "./widgets/balance/balance.component";
import { MyPortfolioComponent } from "./widgets/my-portfolio/my-portfolio.component";
import { ActivitiesComponent } from "./widgets/activities/activities.component";
import { AverageSalePriceComponent } from "./widgets/average-sale-price/average-sale-price.component";
import { TopPerformersComponent } from "./widgets/top-performers/top-performers.component";
import { averageDayDetails, currencyChart } from '../../../shared/data/dashboard/crypto';

@Component({
  selector: 'app-crypto',
  imports: [DetailsCardComponent, AverageDayDetailsComponent, TransactionsComponent,
            CurrencyChartComponent, MarketGraphComponent, MyCurrencyComponent,
            BuyCoinComponent, SellCoinComponent, BalanceComponent,
            MyPortfolioComponent, ActivitiesComponent, AverageSalePriceComponent, TopPerformersComponent],
  templateUrl: './crypto.component.html',
  styleUrl: './crypto.component.scss'
})

export class CryptoComponent {

  public averageDayDetails = averageDayDetails;
  public currencyChart = currencyChart;

}
