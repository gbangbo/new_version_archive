import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { socialAnalytics, socialAnalyticsTab } from '../../../../../shared/data/dashboard/social';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-social-analytics',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './social-analytics.component.html',
  styleUrl: './social-analytics.component.scss'
})

export class SocialAnalyticsComponent {

  public cardToggleOption = cardToggleOptions1;
  public socialAnalyticsTab = socialAnalyticsTab;
  public socialAnalytics = socialAnalytics;
  public activeTab: string = 'youtube';

  handleTab(value: string) {
    this.activeTab = value;
  }
  
}
