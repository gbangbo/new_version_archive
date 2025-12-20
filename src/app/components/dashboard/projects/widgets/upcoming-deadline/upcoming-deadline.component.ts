import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { upcomingDeadline } from '../../../../../shared/data/dashboard/projects';
import { UpcomingDeadline } from '../../../../../shared/interface/dashboard/projects';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-upcoming-deadline',
  imports: [CardComponent, TableComponent],
  templateUrl: './upcoming-deadline.component.html',
  styleUrl: './upcoming-deadline.component.scss'
})

export class UpcomingDeadlineComponent {

  public cardToggleOption = cardToggleOptions3;
  public upcomingDeadline = upcomingDeadline;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Employee', field_value: 'employee', sort: true },
      { title: 'Task', field_value: 'task', sort: true },
      { title: 'Deadline', field_value: 'deadline', sort: true },
    ],

    data: [] as UpcomingDeadline[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToTask'] = () => {
      this.router.navigate(['/task']);
    };

    this.tableConfig.data = upcomingDeadline.map((details: UpcomingDeadline) => {
      const formattedDetails = { ...details };
      formattedDetails.employee = this.sanitizer.bypassSecurityTrustHtml(`<a class="font-medium" href="javascript:void(0)" onclick="navigateToTask()">${details.employee}</a>`);

      return formattedDetails;
    });
  }

}
