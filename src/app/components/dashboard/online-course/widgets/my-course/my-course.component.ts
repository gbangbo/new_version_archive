import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { myCourses } from '../../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-my-course',
  imports: [RouterModule,CardComponent, FeatherIconComponent],
  templateUrl: './my-course.component.html',
  styleUrl: './my-course.component.scss'
})

export class MyCourseComponent {

  public myCourses = myCourses;

}
