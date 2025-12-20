import { Component } from '@angular/core';

import { LastMonthDetailsComponent } from "../../widgets/general/widgets/last-month-details/last-month-details.component";
import { CrmToDoComponent } from "./widgets/crm-to-do/crm-to-do.component";
import { DealsComponent } from "./widgets/deals/deals.component";
import { FinanceOverviewComponent } from "./widgets/finance-overview/finance-overview.component";
import { LeadSourceComponent } from "./widgets/lead-source/lead-source.component";
import { LeadsComponent } from "./widgets/leads/leads.component";
import { PipelineBreakdownComponent } from "./widgets/pipeline-breakdown/pipeline-breakdown.component";
import { RevenueGrowthComponent } from "./widgets/revenue-growth/revenue-growth.component";
import { SalesChartComponent } from "./widgets/sales-chart/sales-chart.component";
import { SalesWeekComponent } from "./widgets/sales-week/sales-week.component";
import { TotalSalesComponent } from "./widgets/total-sales/total-sales.component";
import { UpgradePlanComponent } from './widgets/upgrade-plan/upgrade-plan.component';
import { lastMonthDetails } from '../../../shared/data/widgets/general';

@Component({
  selector: 'app-crm',
  imports: [LastMonthDetailsComponent, TotalSalesComponent, UpgradePlanComponent,
            SalesChartComponent, RevenueGrowthComponent, PipelineBreakdownComponent,
            CrmToDoComponent, FinanceOverviewComponent, DealsComponent,
            LeadsComponent, SalesWeekComponent, LeadSourceComponent],
  templateUrl: './crm.component.html',
  styleUrl: './crm.component.scss'
})

export class CrmComponent {

  public lastMonthDetails = lastMonthDetails;

}
