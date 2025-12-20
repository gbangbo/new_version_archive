import { Component } from '@angular/core';

import { CourseFilterComponent } from "../course-filter/course-filter.component";
import { SingleBlogDetailsComponent } from "../../blog/widgets/single-blog-details/single-blog-details.component";
import { corsesComments, courseDetails } from '../../../shared/data/courses';

@Component({
  selector: 'app-course-details',
  imports: [CourseFilterComponent, SingleBlogDetailsComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})

export class CourseDetailsComponent {

  public courseDetails = courseDetails;
  public corsesComments = corsesComments;

}
