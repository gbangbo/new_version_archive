import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { allProjects } from '../../../../../shared/data/dashboard/projects';
import { AllProjects } from '../../../../../shared/interface/dashboard/projects';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-all-projects',
  imports: [CardComponent, TableComponent],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.scss'
})

export class AllProjectsComponent {

  public cardToggleOption = cardToggleOptions3;
  public allProjects = allProjects;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Id', field_value: 'project_id', sort: true },
      { title: 'Manager Name', field_value: 'name', sort: true },
      { title: 'Project Name', field_value: 'project_name', sort: true },
      { title: 'Start Date', field_value: 'start_date', sort: true },
      { title: 'End Date', field_value: 'end_date', sort: true },
      { title: 'Priority', field_value: 'priority', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],

    data: [] as AllProjects[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    (window as any)['navigateToProject'] = () => {
      this.router.navigate(['/project/project-details']);
    };

    this.tableConfig.data = allProjects.map((details: AllProjects) => {
      const formattedDetails = { ...details };
      formattedDetails.project_id = this.sanitizer.bypassSecurityTrustHtml(`<a class="font-medium" href="javascript:void(0)" onclick="navigateToProject()">${details.project_id}</a>`);

      formattedDetails.name = `<div class="common-flex items-center">
                              <img class="max-w-full rounded-full" src="${details.image}" alt="user">
                              <a href="javascript:void(0)">${details.name}</a>
                              </div>`;

      formattedDetails.status = `<span class="badge badge-light-${details.class}">${details.status}</span>`;
      
      return formattedDetails;
    });
  }

}
