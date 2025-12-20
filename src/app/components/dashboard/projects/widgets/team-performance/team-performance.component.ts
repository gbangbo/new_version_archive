import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { teamPerformance } from '../../../../../shared/data/dashboard/projects';
import { TeamPerformance } from '../../../../../shared/interface/dashboard/projects';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-team-performance',
  imports: [CardComponent, TableComponent],
  templateUrl: './team-performance.component.html',
  styleUrl: './team-performance.component.scss'
})
export class TeamPerformanceComponent {

  public cardToggleOption = cardToggleOptions3;
  public teamPerformance = teamPerformance;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Team Member', field_value: 'name', sort: true },
      { title: 'Assigned', field_value: 'assigned', sort: true },
      { title: 'Completed', field_value: 'completed', sort: true },
      { title: 'Rate', field_value: 'rate', sort: true },
    ],

    data: [] as TeamPerformance[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToProject'] = () => {
      this.router.navigate(['/project/project-list']);
    };

    this.tableConfig.data = teamPerformance.map((details: TeamPerformance) => {
      const formattedDetails = { ...details };

      formattedDetails.name = this.sanitizer.bypassSecurityTrustHtml(`<a class="font-medium" href="javascript:void(0)" onclick="navigateToProject()">${details.name}</a>`);

      return formattedDetails;
    });
  }
}
