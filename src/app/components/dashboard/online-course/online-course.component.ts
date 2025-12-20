import { Component } from '@angular/core';

import { CoursesComponent } from "./widgets/courses/courses.component";
import { WelcomeCardComponent } from './widgets/welcome-card/welcome-card.component';
import { TodayProgressComponent } from "./widgets/today-progress/today-progress.component";
import { AdvertisementComponent } from "./widgets/advertisement/advertisement.component";
import { CalendarComponent } from "./widgets/calendar/calendar.component";
import { LearningOverviewComponent } from "./widgets/learning-overview/learning-overview.component";
import { ActivityHoursComponent } from "./widgets/activity-hours/activity-hours.component";
import { UpcomingCoursesComponent } from "./widgets/upcoming-courses/upcoming-courses.component";
import { TopMentorsComponent } from "./widgets/top-mentors/top-mentors.component";
import { CompletedCoursesComponent } from "./widgets/completed-courses/completed-courses.component";
import { MyCourseComponent } from "./widgets/my-course/my-course.component";
import { UpcomingScheduleComponent } from "./widgets/upcoming-schedule/upcoming-schedule.component";
import { ActiveCoursesComponent } from "./widgets/active-courses/active-courses.component";
import { courses } from '../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-online-course',
  imports: [WelcomeCardComponent, CoursesComponent, TodayProgressComponent,
            AdvertisementComponent, CalendarComponent, LearningOverviewComponent,
            ActivityHoursComponent, UpcomingCoursesComponent, TopMentorsComponent,
            CompletedCoursesComponent, MyCourseComponent, UpcomingScheduleComponent,
            ActiveCoursesComponent],
  templateUrl: './online-course.component.html',
  styleUrl: './online-course.component.scss'
})

export class OnlineCourseComponent {

  public courses = courses;

}
