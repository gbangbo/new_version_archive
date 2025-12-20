import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { completedCourses } from '../../../../../shared/data/dashboard/online-course';
import { CompletedCourses } from '../../../../../shared/interface/dashboard/online-course';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-completed-courses',
  imports: [CardComponent, TableComponent],
  templateUrl: './completed-courses.component.html',
  styleUrl: './completed-courses.component.scss'
})

export class CompletedCoursesComponent {

  public cardToggleOptions = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Student Name', field_value: 'student_name', sort: true },
      { title: 'Course Name', field_value: 'course_name', sort: true },
      { title: 'Completion Date', field_value: 'completion_date', sort: true },
      { title: 'Mentor Name', field_value: 'mentor_name', sort: true },
    ],
    data: [] as CompletedCourses[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToCourses'] = () => {
      this.router.navigate(['/courses/courses-details']);
    };

    this.tableConfig.data = completedCourses.map((course: CompletedCourses) => {
      const formattedCourse = { ...course };
      formattedCourse.student_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                                  <img class="max-w-full h-auto" src="${course.student_profile}" alt="user">
                                  <a class="font-medium" href="javascript:void(0)"  onclick="navigateToCourses()">
                                    ${course.student_name}
                                  </a>
                                </div>`);
                                
      return formattedCourse;
    });
  }

}
