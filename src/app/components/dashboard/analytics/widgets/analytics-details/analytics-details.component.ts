import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { AnalyticsDetailsChart } from '../../../../../shared/interface/dashboard/analytics';

@Component({
  selector: 'app-analytics-details',
  imports: [CommonModule, NgApexchartsModule, FeatherIconComponent, SvgIconComponent],
  templateUrl: './analytics-details.component.html',
  styleUrl: './analytics-details.component.scss'
})

export class AnalyticsDetailsComponent {

  @Input() chart: AnalyticsDetailsChart;

}
