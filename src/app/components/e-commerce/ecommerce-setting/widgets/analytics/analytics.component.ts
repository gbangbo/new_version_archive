import { Component } from '@angular/core';

import { analyticTabs } from '../../../../../shared/data/e-commerce-setting';

@Component({
  selector: 'app-analytics',
  imports: [],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})

export class AnalyticsComponent {

  public activeTab = 'facebook-pixel';
  public analyticTabs = analyticTabs;

  handleTab(value: string) {
    this.activeTab = value;
  }

}
