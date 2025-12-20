import { CommonModule, SlicePipe } from '@angular/common';
import { Component } from '@angular/core';

import { CurrencyChartComponent } from "../../dashboard/crypto/widgets/currency-chart/currency-chart.component";
import { AverageDayDetailsComponent } from "../../dashboard/crypto/widgets/average-day-details/average-day-details.component";
import { DetailsComponent } from '../../dashboard/default/widgets/details/details.component';
import { CoursesComponent } from '../../dashboard/online-course/widgets/courses/courses.component';
import { WebsiteTrafficComponent } from '../../dashboard/e-commerce/widgets/website-traffic/website-traffic.component';
import { SessionByDeviceComponent } from './widgets/session-by-device/session-by-device.component';
import { SocialMediaDetailsComponent } from '../../dashboard/social/widgets/social-media-details/social-media-details.component';
import { LastMonthDetailsComponent } from "./widgets/last-month-details/last-month-details.component";
import { TotalUsersComponent } from "./widgets/total-users/total-users.component";
import { PageViewsComponent } from "./widgets/page-views/page-views.component";
import { AllVisitsComponent } from "./widgets/all-visits/all-visits.component";
import { ActivityHoursComponent } from '../../dashboard/online-course/widgets/activity-hours/activity-hours.component';
import { averageDayDetails, currencyChart } from '../../../shared/data/dashboard/crypto';
import { details } from '../../../shared/data/dashboard/default';
import { courses } from '../../../shared/data/dashboard/online-course';
import { socialMediaDetails } from '../../../shared/data/dashboard/social';
import { lastMonthDetails } from '../../../shared/data/widgets/general';

@Component({
  selector: 'app-general',
  imports: [CommonModule, SlicePipe, CurrencyChartComponent,
            AverageDayDetailsComponent, DetailsComponent, CoursesComponent,
            WebsiteTrafficComponent, SessionByDeviceComponent, SocialMediaDetailsComponent,
            LastMonthDetailsComponent, TotalUsersComponent, PageViewsComponent,
            AllVisitsComponent, ActivityHoursComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})

export class GeneralComponent {

  public currencyChart = currencyChart;
  public averageDayDetails = averageDayDetails;
  public details = details;
  public courses = courses;
  public socialMediaDetails = socialMediaDetails;
  public lastMonthDetails = lastMonthDetails;

}
