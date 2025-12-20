import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { unPaidFees } from '../../../../../shared/data/dashboard/school-management';
import { UnPaidFees } from '../../../../../shared/interface/dashboard/school-management';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-unpaid-fees',
  imports: [TableComponent, CardComponent],
  templateUrl: './unpaid-fees.component.html',
  styleUrl: './unpaid-fees.component.scss'
})

export class UnpaidFeesComponent {

  public unPaidFees = unPaidFees;
  public cardToggleOption = cardToggleOptions1;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Name', field_value: 'name', sort: true },
      { title: 'ID', field_value: 'student_id', sort: true, },
      { title: 'Standard', field_value: 'standard', sort: true, },
      { title: 'Section', field_value: 'section', sort: true },
      { title: 'Fees', field_value: 'fees', sort: true, },
      { title: 'Due Date', field_value: 'due_date', sort: true, },
    ],
    data: [] as UnPaidFees[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToUser'] = () => {
      this.router.navigate(['/user/user-profile/1']);
    };

    this.tableConfig.data = unPaidFees.map((student: UnPaidFees) => {
      const formattedStudents = { ...student };
      formattedStudents.name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-align justify-start">
                                  <img class="max-w-full h-auto img-40 rounded-full me-2" src="${student.image}" alt="user">
                                    <div class="img-content-box">
                                    <a class="font-medium" href="javascript:void(0)" onclick="navigateToUser()">${student.name}</a></div>
                                </div>`);
                                
      return formattedStudents;
    });
  }

}
