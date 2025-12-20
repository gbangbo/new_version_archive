import { Routes } from '@angular/router';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

export const courses: Routes = [
    {
      path: 'courses-list',
      component: CourseListComponent,
      data: {
        title: 'Course List',
        breadcrumb: 'Course List',
      }
    },
    {
      path: 'courses-details',
      component: CourseDetailsComponent,
      data: {
        title: 'Course Details',
        breadcrumb: 'Course Details',
      }
    },
]