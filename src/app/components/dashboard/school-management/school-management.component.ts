import { Component } from '@angular/core';

import { AcademicPerformanceComponent } from "./widgets/academic-performance/academic-performance.component";
import { SchoolPerformanceComponent } from "./widgets/school-performance/school-performance.component";
import { SchoolDetailsComponent } from "./widgets/school-details/school-details.component";
import { SchoolFinanceComponent } from "./widgets/school-finance/school-finance.component";
import { PerformanceOverviewComponent } from "./widgets/performance-overview/performance-overview.component";
import { SchoolCalendarComponent } from "./widgets/school-calendar/school-calendar.component";
import { TodayTaskComponent } from "./widgets/today-task/today-task.component";
import { IncreaseKnowledgeComponent } from "./widgets/increase-knowledge/increase-knowledge.component";
import { NoticeBoardComponent } from "./widgets/notice-board/notice-board.component";
import { ShinningStarsComponent } from "./widgets/shinning-stars/shinning-stars.component";
import { UnpaidFeesComponent } from "./widgets/unpaid-fees/unpaid-fees.component";
import { TopStudentComponent } from "./widgets/top-student/top-student.component";
import { StudentComponent } from "./widgets/student/student.component";
import { NewEnrollStudentComponent } from "./widgets/new-enroll-student/new-enroll-student.component";
import { AttendanceComponent } from "./widgets/attendance/attendance.component";
import { schoolDetails } from '../../../shared/data/dashboard/school-management';

@Component({
  selector: 'app-school-management',
  imports: [AcademicPerformanceComponent, SchoolPerformanceComponent, SchoolDetailsComponent,
            SchoolFinanceComponent, PerformanceOverviewComponent, SchoolCalendarComponent,
            TodayTaskComponent, IncreaseKnowledgeComponent, NoticeBoardComponent,
            ShinningStarsComponent, UnpaidFeesComponent, TopStudentComponent, 
            StudentComponent, NewEnrollStudentComponent, AttendanceComponent],
  templateUrl: './school-management.component.html',
  styleUrl: './school-management.component.scss'
})

export class SchoolManagementComponent {

  public schoolDetails = schoolDetails;

}
