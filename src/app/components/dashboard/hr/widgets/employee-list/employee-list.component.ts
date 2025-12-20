import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { employeeList } from '../../../../../shared/data/dashboard/hr';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { EmployeeList } from '../../../../../shared/interface/dashboard/hr';
import { TableClickedAction, TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-employee-list',
  imports: [CardComponent, TableComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})

export class EmployeeListComponent {

  public employeeList = employeeList;
  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Name', field_value: 'name', sort: true },
      { title: 'Employees ID', field_value: 'employee_id', sort: true },
      { title: 'Email ID', field_value: 'email', sort: true },
      { title: 'Joining  Date', field_value: 'joining_date', sort: true },
      { title: 'Role', field_value: 'role', sort: true },
    ],
    row_action: [
      { label: "Edit", action_to_perform: "edit", icon: "edit-content" },
      { label: "Delete", action_to_perform: "delete", icon: "trash1", modal: false }

    ],
    data: [] as EmployeeList[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToUser'] = () => {
      this.router.navigate(['/user/user-list']);
    };

    this.tableConfig.data = this.formatEmployeeDetails(employeeList);
  }

  handleAction(value: TableClickedAction) {
    if (value.action_to_perform === "delete" && value.data) {
      this.employeeList = this.employeeList.filter((employee: EmployeeList) => employee.id !== value.data.id);
      this.tableConfig = { ...this.tableConfig, data: this.formatEmployeeDetails(this.employeeList) };
    }
  }

  private formatEmployeeDetails(employees: EmployeeList[]) {
    return employees.map((employee: EmployeeList) => {
      const formattedEmployee = { ...employee };
      formattedEmployee.name = this.sanitizer.bypassSecurityTrustHtml(`<div class="common-flex items-center">
                                      <img class="max-w-full rounded-full" src="${employee.image}" alt="user">
                                      <a class="font-medium" href="javascript:void(0)" onclick="navigateToUser()">${employee.name}</a>
                                </div>`);
                                
      return formattedEmployee;
    })
  }
}
