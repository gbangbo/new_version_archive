import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { UpgradePlanComponent } from "../upgrade-plan/upgrade-plan.component";
import { analyticsCharts } from '../../../../../shared/data/dashboard/nft';
@Component({
  selector: 'app-analytics-chart',
  imports: [NgApexchartsModule, CardComponent, FeatherIconComponent, UpgradePlanComponent],
  templateUrl: './analytics-chart.component.html',
  styleUrl: './analytics-chart.component.scss'
})

export class AnalyticsChartComponent {

  public analyticsCharts = analyticsCharts;

}
