import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from '../../../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../../../shared/components/ui/table/table.component';
import { projectDetails } from '../../../../../../../shared/data/project';
import { TableConfigs } from '../../../../../../../shared/interface/common';
import { PendingProject, ProjectDetails, } from '../../../../../../../shared/interface/project';

@Component({
  selector: 'app-pending-projects',
  imports: [CardComponent, TableComponent],
  templateUrl: './pending-projects.component.html',
  styleUrl: './pending-projects.component.scss',
})

export class PendingProjectsComponent {

  public projectDetails = projectDetails;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Project Name', field_value: 'project_name', sort: true },
      { title: 'Project Head', field_value: 'project_head_name', sort: true },
      { title: 'Priority', field_value: 'priority', sort: true },
      { title: 'Due Date', field_value: 'due_date', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    data: [] as ProjectDetails[],
  };

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.tableConfig.data =
      this.projectDetails.project_summary.pending_project.map(
        (project: PendingProject) => {
          const formattedProjects = { ...project };
          formattedProjects.project_head_name = `<div class="common-flex items-center">
                            <img class="max-w-full lead-img" src="${project.project_head_profile}" alt="user">
                            <div><a class="c-light" href="javascript:void(0)">${project.project_head_name}</a>
                              <p class="mb-0 c-o-light">${project.project_head_email}</p>
                            </div>
                          </div>`;

          const statusHTML = `<button class="btn button-light-${project.color} txt-${project.color}"> 
                                ${project.status}
                              </button>`;
                              
          formattedProjects.status = this.sanitizer.bypassSecurityTrustHtml(statusHTML);
         
          return formattedProjects;
        }
      );
  }
}
