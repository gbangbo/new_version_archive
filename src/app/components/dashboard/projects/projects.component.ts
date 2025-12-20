import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsComponent } from "../projects/widgets/details/details.component";
import { PriorityTaskComponent } from "./widgets/priority-task/priority-task.component";
import { TaskStatisticsComponent } from "./widgets/task-statistics/task-statistics.component";
import { TodayTaskComponent } from "./widgets/today-task/today-task.component";
import { AllProjectsComponent } from "./widgets/all-projects/all-projects.component";
import { EstimatedActualChartComponent } from "./widgets/estimated-actual-chart/estimated-actual-chart.component";
import { TeamPerformanceComponent } from "./widgets/team-performance/team-performance.component";
import { ExpensesChartComponent } from "./widgets/expenses-chart/expenses-chart.component";
import { UpcomingDeadlineComponent } from "./widgets/upcoming-deadline/upcoming-deadline.component";
import { ProjectAnalysisComponent } from "./widgets/project-analysis/project-analysis.component";
import { RecentActivityComponent } from "./widgets/recent-activity/recent-activity.component";
import { expensesChart, projectDetails } from '../../../shared/data/dashboard/projects';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, DetailsComponent, PriorityTaskComponent, TaskStatisticsComponent,
            TodayTaskComponent, AllProjectsComponent, EstimatedActualChartComponent,
            TeamPerformanceComponent, ExpensesChartComponent, UpcomingDeadlineComponent, 
            ProjectAnalysisComponent, RecentActivityComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {

  public projectDetails = projectDetails;
  public expensesChart = expensesChart;

}
