import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { performanceOverview } from '../../../../../shared/data/dashboard/school-management';

@Component({
  selector: 'app-performance-overview',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './performance-overview.component.html',
  styleUrl: './performance-overview.component.scss'
})

export class PerformanceOverviewComponent {

  public performanceOverview = performanceOverview;

}
