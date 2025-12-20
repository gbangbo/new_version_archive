import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { topStudent } from '../../../../../shared/data/dashboard/school-management';
import { TopStudent } from '../../../../../shared/interface/dashboard/school-management';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-top-student',
  imports: [TableComponent, CardComponent],
  templateUrl: './top-student.component.html',
  styleUrl: './top-student.component.scss'
})

export class TopStudentComponent {

  public topStudent = topStudent;
  public cardToggleOption = cardToggleOptions1;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'ID', field_value: 'student_id', sort: true },
      { title: 'Name', field_value: 'name', sort: true, },
      { title: 'Marks', field_value: 'marks', sort: true, },
      { title: 'Percentage', field_value: 'percentage', sort: true },
      { title: 'Year', field_value: 'year', sort: true, },
      { title: 'Standard', field_value: 'standard', sort: true, },
    ],
    data: [] as TopStudent[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToStudent'] = () => {
      this.router.navigate(['/user/user-profile/1']);
    };

    this.tableConfig.data = topStudent.map((student: TopStudent) => {
      const formattedStudents = { ...student };
      formattedStudents.name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-align justify-start">
                                    <img class="max-w-full h-auto img-40 rounded-full me-2" src="${student.image}" alt="user">
                                    <div class="img-content-box">
                                    <a class="font-medium" href="javascript:void(0)" onclick="navigateToStudent()">${student.name}</a>
                                    </div>
                                </div>`);
                                
      return formattedStudents;
    });
  }

}
