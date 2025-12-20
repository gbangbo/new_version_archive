import { Component } from '@angular/core';

import { EmployeeDetailsComponent } from "./widgets/employee-details/employee-details.component";
import { ProjectSummaryCardComponent } from "./widgets/project-summary-card/project-summary-card.component";
import { ApplicationOverviewComponent } from "./widgets/application-overview/application-overview.component";
import { EmployeeListComponent } from "./widgets/employee-list/employee-list.component";
import { AttendanceOverviewComponent } from "./widgets/attendance-overview/attendance-overview.component";
import { TodayBirthdayComponent } from "./widgets/today-birthday/today-birthday.component";
import { RecruitmentAnalysisComponent } from "./widgets/recruitment-analysis/recruitment-analysis.component";
import { TodayScheduleComponent } from "./widgets/today-schedule/today-schedule.component";
import { InterviewScheduleComponent } from "./widgets/interview-schedule/interview-schedule.component";
import { LeaveRequestComponent } from "./widgets/leave-request/leave-request.component";
import { employeeDetails } from '../../../shared/data/dashboard/hr';

@Component({
  selector: 'app-hr',
  imports: [EmployeeDetailsComponent, ProjectSummaryCardComponent, ApplicationOverviewComponent,
            EmployeeListComponent, AttendanceOverviewComponent, TodayBirthdayComponent,
            RecruitmentAnalysisComponent, TodayScheduleComponent, InterviewScheduleComponent, 
            LeaveRequestComponent],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.scss'
})

export class HrComponent {

  public employeeDetails = employeeDetails;

}
