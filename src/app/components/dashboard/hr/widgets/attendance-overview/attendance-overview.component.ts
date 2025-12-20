import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { attendanceOverview } from '../../../../../shared/data/dashboard/hr';
import { AttendanceOverview } from '../../../../../shared/interface/dashboard/hr';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-attendance-overview',
  imports: [TableComponent, CardComponent],
  templateUrl: './attendance-overview.component.html',
  styleUrl: './attendance-overview.component.scss'
})

export class AttendanceOverviewComponent {

  public attendanceOverview = attendanceOverview;
  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Employee Name', field_value: 'employee_name', sort: true },
      { title: 'Designation', field_value: 'designation', sort: true },
      { title: 'Check In Time', field_value: 'check_in_time', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],

    data: [] as AttendanceOverview[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToUser'] = () => {
      this.router.navigate(['/user/user-list']);
    };

    this.tableConfig.data = attendanceOverview.map((details: AttendanceOverview) => {
      const formattedDetails = { ...details };

      formattedDetails.employee_name = this.sanitizer.bypassSecurityTrustHtml(`<a class="font-medium" href="javascript:void(0)"  onclick="navigateToUser()">${details.employee_name}</a>`);

      formattedDetails.status = `<span class="badge badge-light-${details.class}">${details.status}</span>`;

      return formattedDetails;
    });
  }

}
