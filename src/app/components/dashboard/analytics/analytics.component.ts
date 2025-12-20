import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllVisitsComponent } from "../../widgets/general/widgets/all-visits/all-visits.component";
import { SessionByDeviceComponent } from "../../widgets/general/widgets/session-by-device/session-by-device.component";
import { AnalyticsDetailsComponent } from "./widgets/analytics-details/analytics-details.component";
import { LiveUserComponent } from "./widgets/live-user/live-user.component";
import { PageAnalyticsComponent } from "./widgets/page-analytics/page-analytics.component";
import { ReferralsVisitComponent } from "./widgets/referrals-visit/referrals-visit.component";
import { SessionByBrowserComponent } from "./widgets/session-by-browser/session-by-browser.component";
import { SessionByCountriesComponent } from "./widgets/session-by-countries/session-by-countries.component";
import { WebsiteAnalyticsComponent } from "./widgets/website-analytics/website-analytics.component";
import { cardToggleOptions2 } from '../../../shared/data/common';
import { analyticsDetailsChart } from '../../../shared/data/dashboard/analytics';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule,AllVisitsComponent, ReferralsVisitComponent, SessionByCountriesComponent,
            WebsiteAnalyticsComponent, AnalyticsDetailsComponent, PageAnalyticsComponent,
            LiveUserComponent, SessionByDeviceComponent, SessionByBrowserComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})

export class AnalyticsComponent {

  public cardToggleOption = cardToggleOptions2;
  public analyticsDetailsChart = analyticsDetailsChart;

}
