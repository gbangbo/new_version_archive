import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { leaveRequests } from '../../../../../shared/data/dashboard/hr';
import { LeaveRequest } from '../../../../../shared/interface/dashboard/hr';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-leave-request',
  imports: [CardComponent, TableComponent],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss'
})

export class LeaveRequestComponent {

  public leaveRequests = leaveRequests;
  public cardToggleOption = cardToggleOptions1;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Name', field_value: 'name', sort: true },
      { title: 'Reason', field_value: 'reason', sort: true },
      { title: 'Action', field_value: 'action', sort: true },
    ],

    data: [] as LeaveRequest[]
  };

  ngOnInit() {
    this.tableConfig.data = leaveRequests.map((details: LeaveRequest) => {
      const formattedDetails = { ...details };
      formattedDetails.name = `  <div class="flex">
                                  <img class="max-w-full rounded-full me-2" src="${details.image}" alt="user">
                                <div class="img-content-box">
                                  <a class="font-medium" href="javascript:void(0)">${details.name}</a>
                                  <p class="mb-0 f-light">${details.leave_period}</p>
                                </div>
                              </div>`;

      formattedDetails.action = `<div class="common-align gap-2 justify-start">
                                  <div class="approval-box bg-success"><i class="fa-solid fa-check text-white"></i></div>
                                  <div class="approval-box border border-danger"><i class="fa-solid fa-ban txt-danger"></i></div>
                                </div>`;
                                
      return formattedDetails;
    });
  }
}
