import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { recentActivity } from '../../../../../shared/data/dashboard/projects';
import { RecentActivity } from '../../../../../shared/interface/dashboard/projects';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-recent-activity',
  imports: [CardComponent, TableComponent],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss'
})

export class RecentActivityComponent {

  public cardToggleOption = cardToggleOptions3;
  public recentActivity = recentActivity;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Activity Description', field_value: 'description', sort: true },
      { title: 'Project', field_value: 'project', sort: true },
      { title: 'Performed By', field_value: 'performed_by', sort: true },
      { title: 'Date', field_value: 'date', sort: true },
    ],

    data: [] as RecentActivity[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToActivity'] = () => {
      this.router.navigate(['/project/project-details']);
    };

    this.tableConfig.data = recentActivity.map((details: RecentActivity) => {
      const formattedDetails = { ...details };
      formattedDetails.description =this.sanitizer.bypassSecurityTrustHtml(`<a href="javascript:void(0)" onclick="navigateToActivity()">${details.description}</a>`);

      return formattedDetails;
    });
  }

}
