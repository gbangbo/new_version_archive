import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../../../shared/components/ui/card/card.component';
import { projectDetails } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-task-overview',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './task-overview.component.html',
  styleUrl: './task-overview.component.scss'
})

export class TaskOverviewComponent {

  public task_overViewChart = projectDetails.project_summary.task_overViewChart;
  
}
