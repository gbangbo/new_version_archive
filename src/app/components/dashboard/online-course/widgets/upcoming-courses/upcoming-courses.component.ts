import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { upcomingCourses } from '../../../../../shared/data/dashboard/online-course';
import { cardToggleOptions5 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-upcoming-courses',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './upcoming-courses.component.html',
  styleUrl: './upcoming-courses.component.scss'
})

export class UpcomingCoursesComponent {

  public upcomingCourses = upcomingCourses;
  public cardToggleOption = cardToggleOptions5;
  
}
