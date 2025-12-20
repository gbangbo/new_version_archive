import { Component } from '@angular/core';

import { CommonLineChartComponent } from "./widgets/common-line-chart/common-line-chart.component";
import { MonthlyHistoryComponent } from "./widgets/monthly-history/monthly-history.component";
import { LiveProductsComponent } from "./widgets/live-products/live-products.component";
import { TurnOverComponent } from "./widgets/turn-over/turn-over.component";
import { SkillStatusComponent } from "./widgets/skill-status/skill-status.component";
import { OrderStatusComponent } from "./widgets/order-status/order-status.component";
import { StockMarketComponent } from "./widgets/stock-market/stock-market.component";
import { FinanceComponent } from "./widgets/finance/finance.component";
import { OrderStatus2Component } from "./widgets/order-status-2/order-status-2.component";
import { UsersComponent } from "./widgets/users/users.component";
import { MonthlySalesComponent } from "./widgets/monthly-sales/monthly-sales.component";
import { CryptocurrencyPriceComponent } from "./widgets/cryptocurrency-price/cryptocurrency-price.component";
import { CryptocurrencyAnnotationComponent } from "./widgets/cryptocurrency-annotation/cryptocurrency-annotation.component";
import { commonLineCharts } from '../../../shared/data/widgets/chart';

@Component({
  selector: 'app-charts',
  imports: [CommonLineChartComponent, MonthlyHistoryComponent, LiveProductsComponent,
            TurnOverComponent, SkillStatusComponent, OrderStatusComponent,
            StockMarketComponent, FinanceComponent, OrderStatus2Component,
            UsersComponent, MonthlySalesComponent, CryptocurrencyPriceComponent, 
            CryptocurrencyAnnotationComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})

export class ChartsComponent {

  public commonLineCharts = commonLineCharts;

}
