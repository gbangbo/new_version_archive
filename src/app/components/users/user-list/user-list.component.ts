import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { TableComponent } from '../../../shared/components/ui/table/table.component';
import { users } from '../../../shared/data/user';
import { TableClickedAction, TableConfigs } from '../../../shared/interface/common';
import { Users } from '../../../shared/interface/user';

@Component({
  selector: 'app-user-list',
  imports: [RouterModule, TableComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {

  public users: Users[];
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Name', field_value: 'name', sort: true },
      { title: 'Email', field_value: 'email', sort: true },
      { title: 'Role', field_value: 'role', sort: true },
      { title: 'Creation Date', field_value: 'creation_date', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    row_action: [
      { label: "Edit", action_to_perform: "edit", icon: "edit-content", path: '/user/add-user' },
      { label: "Delete", action_to_perform: "delete", icon: "trash1", modal: true, model_text: 'Do you really want to delete the user?' }
    ],
    data: [] as Users[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToUser'] = () => {
      this.router.navigate(['/user/user-profile/1']);
    };

    this.users = users;
    this.tableConfig.data = this.formatUserDetails(users);
  }

  handleAction(value: TableClickedAction) {
    if (value.action_to_perform === "delete" && value.data) {
        this.users = this.users.filter((user: Users) => user.id !== value.data.id);
        this.tableConfig = {...this.tableConfig, data: this.formatUserDetails(this.users)};
      }
  }

  private formatUserDetails(users: Users[]) {
    return users.map((user: Users) => {
      const formattedProducts = { ...user };
      formattedProducts.name = this.sanitizer.bypassSecurityTrustHtml( `<a href="javascript:void(0)" onclick="navigateToUser()">${user.name}</a>`);

      formattedProducts.email = `<p>${user.email}</p>`;
      formattedProducts.role = `<p>${user.role}</p>`;
      formattedProducts.creation_date = `<p>${user.creation_date}</p>`;
      formattedProducts.status = `<span class="badge badge-light-${user.status == 'active' ? 'success' : 
                                                                  user.status == 'pending' ? 'warning' : ''}">${user.status.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</span>`;
      return formattedProducts;
    });
  }
  
}
