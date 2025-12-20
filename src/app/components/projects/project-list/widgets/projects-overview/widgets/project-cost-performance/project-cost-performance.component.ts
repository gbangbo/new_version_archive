import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { projectCostPerformance } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-project-cost-performance',
  imports: [NgApexchartsModule],
  templateUrl: './project-cost-performance.component.html',
  styleUrl: './project-cost-performance.component.scss'
})

export class ProjectCostPerformanceComponent {

  public projectCostPerformance = projectCostPerformance;

}
