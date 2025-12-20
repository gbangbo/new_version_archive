import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SocialAnalyticsChart } from '../../../../../shared/interface/dashboard/social';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-social-analytics-charts',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './social-analytics-charts.component.html',
  styleUrl: './social-analytics-charts.component.scss'
})

export class SocialAnalyticsChartsComponent {

  @Input() analyticsChart: SocialAnalyticsChart;

  public cardToggleOption = cardToggleOptions3;

}
