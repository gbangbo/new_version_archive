import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { HorizontalBlogComponent } from "../../blog/widgets/horizontal-blog/horizontal-blog.component";
import { VerticalBlogComponent } from "../../blog/widgets/vertical-blog/vertical-blog.component";
import { CourseFilterComponent } from "../course-filter/course-filter.component";
import { courseList } from '../../../shared/data/courses';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseFilterComponent, VerticalBlogComponent, HorizontalBlogComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {

  public courseList = courseList;

}
