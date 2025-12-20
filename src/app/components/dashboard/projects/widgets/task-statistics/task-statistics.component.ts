import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { taskStatistics } from '../../../../../shared/data/dashboard/projects';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-task-statistics',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './task-statistics.component.html',
  styleUrl: './task-statistics.component.scss'
})

export class TaskStatisticsComponent {

  public taskStatistics = taskStatistics;
  public cardToggleOption = cardToggleOptions3;

}
