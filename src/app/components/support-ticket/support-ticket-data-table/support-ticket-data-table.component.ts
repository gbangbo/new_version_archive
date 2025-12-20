import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { supportDataTable } from '../../../shared/data/support-ticket';
import { TableConfigs } from '../../../shared/interface/common';
import { SupportDB } from '../../../shared/interface/support-ticket';

@Component({
  selector: 'app-support-ticket-data-table',
  imports: [TableComponent],
  templateUrl: './support-ticket-data-table.component.html',
  styleUrl: './support-ticket-data-table.component.scss'
})

export class SupportTicketDataTableComponent {

  public supportDataTable = supportDataTable;
  public selected: number[] = [];

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Name', field_value: 'name', sort: true },
      { title: 'Position', field_value: 'position', sort: true },
      { title: 'Salary', field_value: 'salary', sort: true, type: 'price' },
      { title: 'Office', field_value: 'office', sort: true },
      { title: 'Skill', field_value: 'progress', sort: true, },
      { title: 'Extn', field_value: 'extn', sort: true, },
      { title: 'E-mail', field_value: 'email', sort: true },
    ],
    data: [] as SupportDB[]
  };

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.tableConfig.data = this.formatSupport(supportDataTable);
  }

  private formatSupport(supportDataTable: SupportDB[]) {
    return supportDataTable.map((users: SupportDB) => {
      const formattedSupport = { ...users };
      formattedSupport.name = ` <div class="flex">
                                <img class="rounded-full img-30 me-3" src="${users.img}" alt="Generic placeholder image">
                                <div class="grow align-self-center">
                                  <div>${users.name}</div>
                                </div>
                              </div>`;

      const html = `<div class="progress-showcase">
                              <div class="progress sm-progress-bar">
                                <div class="progress-bar bg-${users.skill}" 
                                     role="progressbar" 
                                     style="width: ${users.progress}" 
                                     aria-valuenow="${users.progress}" 
                                     aria-valuemin="0" 
                                     aria-valuemax="100">
                                </div>
                              </div>
                            </div>`;
                            
      formattedSupport.progress = this.sanitizer.bypassSecurityTrustHtml(html)

      return formattedSupport;
    });
  }

}
