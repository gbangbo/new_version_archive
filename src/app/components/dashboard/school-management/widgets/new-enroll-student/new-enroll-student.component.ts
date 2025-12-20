import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { newStudentEnroll } from '../../../../../shared/data/dashboard/school-management';
import { NewStudentEnroll } from '../../../../../shared/interface/dashboard/school-management';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-new-enroll-student',
  imports: [TableComponent, CardComponent],
  templateUrl: './new-enroll-student.component.html',
  styleUrl: './new-enroll-student.component.scss'
})

export class NewEnrollStudentComponent {

  public newStudentEnroll = newStudentEnroll;
  public cardToggleOption = cardToggleOptions1;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Name', field_value: 'name', sort: true, },
      { title: 'ID', field_value: 'id', sort: true, },
      { title: 'Standard', field_value: 'standard', sort: true, },
      { title: 'Section', field_value: 'section', sort: true },
      { title: 'Admission Date', field_value: 'admission_date', sort: true, },
    ],
    data: [] as NewStudentEnroll[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToStudent'] = () => {
      this.router.navigate(['/user/user-profile/1']);
    };

    this.tableConfig.data = newStudentEnroll.map((student: NewStudentEnroll) => {
      const formattedStudents = { ...student };
      formattedStudents.name = this.sanitizer.bypassSecurityTrustHtml(` <div class="common-align justify-start">
                                      <img class="max-w-full h-auto img-40 rounded-full me-2" src="${student.profile_image}" alt="user">
                                      <div class="img-content-box">
                                      <a class="font-medium" href="javascript:void(0)" onclick="navigateToStudent()">${student.name}</a></div>
                                    </div>`);
                                    
      return formattedStudents;
    });
  }

}
