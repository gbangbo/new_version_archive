import { Component } from '@angular/core';

import { SocialMediaDetailsComponent } from "./widgets/social-media-details/social-media-details.component";
import { SocialMediaAnnouncementComponent } from "./widgets/social-media-announcement/social-media-announcement.component";
import { InstagramSubscribersComponent } from "./widgets/instagram-subscribers/instagram-subscribers.component";
import { FacebookCampaignComponent } from "./widgets/facebook-campaign/facebook-campaign.component";
import { AllCampaignsComponent } from "./widgets/all-campaigns/all-campaigns.component";
import { SocialAnalyticsChartsComponent } from './widgets/social-analytics-charts/social-analytics-charts.component';
import { SocialAnalyticsComponent } from "./widgets/social-analytics/social-analytics.component";
import { TopFollowersComponent } from "./widgets/top-followers/top-followers.component";
import { socialAnalyticsChart, socialMediaDetails } from '../../../shared/data/dashboard/social';

@Component({
  selector: 'app-social',
  imports: [SocialMediaDetailsComponent, SocialMediaAnnouncementComponent, InstagramSubscribersComponent,
            FacebookCampaignComponent, AllCampaignsComponent, SocialAnalyticsChartsComponent, 
            SocialAnalyticsComponent, TopFollowersComponent],
  templateUrl: './social.component.html',
  styleUrl: './social.component.scss'
})

export class SocialComponent {

  public socialMediaDetails = socialMediaDetails;
  public socialAnalyticsChart = socialAnalyticsChart;

}
