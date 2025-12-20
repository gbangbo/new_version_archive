import { Component } from '@angular/core';

import { WelcomeCardComponent } from "./widgets/welcome-card/welcome-card.component";
import { DetailsComponent } from "./widgets/details/details.component";
import { VisitorsChartComponent } from "./widgets/visitors-chart/visitors-chart.component";
import { TopCustomersComponent } from "./widgets/top-customers/top-customers.component";
import { SalesStatisticalComponent } from "./widgets/sales-statistical/sales-statistical.component";
import { MonthlyTargetComponent } from "./widgets/monthly-target/monthly-target.component";
import { ActivityLogComponent } from "./widgets/activity-log/activity-log.component";
import { RecentOrdersComponent } from "./widgets/recent-orders/recent-orders.component";
import { BuyAccountComponent } from "./widgets/buy-account/buy-account.component";
import { SalesReportComponent } from "./widgets/sales-report/sales-report.component";
import { ManageAppointmentsComponent } from "./widgets/manage-appointments/manage-appointments.component";
import { details } from '../../../shared/data/dashboard/default';

@Component({
  selector: 'app-default',
  imports: [WelcomeCardComponent, DetailsComponent, VisitorsChartComponent,
            TopCustomersComponent, SalesStatisticalComponent, MonthlyTargetComponent, 
            ActivityLogComponent, RecentOrdersComponent, BuyAccountComponent, 
            SalesReportComponent, ManageAppointmentsComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {

  public details = details;

}
