import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { pageViewsChart } from '../../../../../shared/data/widgets/general';
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-page-views',
  imports: [NgApexchartsModule, FeatherIconComponent, SvgIconComponent],
  templateUrl: './page-views.component.html',
  styleUrl: './page-views.component.scss'
})

export class PageViewsComponent {

  public pageViewsChart = pageViewsChart;

}
