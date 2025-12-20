import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { activeCourse } from '../../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-active-courses',
  imports: [RouterModule, NgApexchartsModule, CardComponent, FeatherIconComponent],
  templateUrl: './active-courses.component.html',
  styleUrl: './active-courses.component.scss'
})

export class ActiveCoursesComponent {

  public activeCourse = activeCourse;

}
