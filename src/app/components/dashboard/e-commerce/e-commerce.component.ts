import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeatherIconComponent } from '../../../shared/components/ui/feather-icon/feather-icon.component';
import { TotalEarningsComponent } from "./widgets/total-earnings/total-earnings.component";
import { DetailsComponent } from './widgets/details/details.component';
import { details } from '../../../shared/data/dashboard/e-commerce';
import { TopCustomersComponent } from "./widgets/top-customers/top-customers.component";
import { MonthOrderComponent } from "./widgets/month-order/month-order.component";
import { MonthlyProfitsComponent } from "./widgets/monthly-profits/monthly-profits.component";
import { RecentTransactionsComponent } from "./widgets/recent-transactions/recent-transactions.component";
import { WebsiteTrafficComponent } from "./widgets/website-traffic/website-traffic.component";
import { RecentOrdersComponent } from "./widgets/recent-orders/recent-orders.component";
import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TopCategoriesComponent } from "./widgets/top-categories/top-categories.component";
import { RecentActivityComponent } from "./widgets/recent-activity/recent-activity.component";
import { OrderOverviewComponent } from "./widgets/order-overview/order-overview.component";
import { StockReportsComponent } from "./widgets/stock-reports/stock-reports.component";
import { BestSellersComponent } from "./widgets/best-sellers/best-sellers.component";
import { PaymentGatewayEarningComponent } from "./widgets/payment-gateway-earning/payment-gateway-earning.component";
import { TrendingProductsComponent } from "./widgets/trending-products/trending-products.component";

@Component({
  selector: 'app-e-commerce',
  imports: [RouterModule, FeatherIconComponent, TotalEarningsComponent,
            DetailsComponent, TopCustomersComponent, MonthOrderComponent,
            MonthlyProfitsComponent, RecentTransactionsComponent, WebsiteTrafficComponent,
            RecentOrdersComponent, CardComponent, TopCategoriesComponent, 
            RecentActivityComponent, OrderOverviewComponent, StockReportsComponent, 
            BestSellersComponent, PaymentGatewayEarningComponent, TrendingProductsComponent],
  templateUrl: './e-commerce.component.html',
  styleUrl: './e-commerce.component.scss'
})
export class ECommerceComponent {

  public tilesDetails = details;

}
