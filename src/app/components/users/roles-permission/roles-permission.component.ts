import { Component } from '@angular/core';

import { TableComponent } from '../../../shared/components/ui/table/table.component';
import { PermissionModalComponent } from '../../../shared/components/ui/modal/permission-modal/permission-modal.component';
import { roles } from '../../../shared/data/user';
import { TableClickedAction, TableConfigs } from '../../../shared/interface/common';
import { Role } from '../../../shared/interface/user';

@Component({
  selector: 'app-roles-permission',
  imports: [TableComponent, PermissionModalComponent],
  templateUrl: './roles-permission.component.html',
  styleUrl: './roles-permission.component.scss'
})

export class RolesPermissionComponent {

  public roles: Role[];
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Role Name', field_value: 'role', sort: true },
      { title: 'Creation Date', field_value: 'creation_date', sort: true },
      { title: 'Last Updated Date', field_value: 'last_update_date', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    row_action: [
      { label: "Edit", action_to_perform: "edit", icon: "edit-content" },
      { label: "Delete", action_to_perform: "delete", icon: "trash1", modal: true, model_text: 'Do you really want to delete the role?' }
    ],
    data: [] as Role[]
  };
  public modalOpen: boolean = false;

  ngOnInit() {
    this.roles = roles;
    this.tableConfig.data = this.formatRoleDetails(roles);
  }

  handleAction(value: TableClickedAction) {
    if (value.action_to_perform === "delete" && value.data) {
        this.roles = this.roles.filter((role: Role) => role.id !== value.data.id);
        this.tableConfig = {...this.tableConfig, data: this.formatRoleDetails(this.roles)};
      }
  }

  private formatRoleDetails(roles: Role[]): Role[] {
    return roles.map((role: Role) => {
      const formattedRole = { ...role };
      formattedRole.role = `<p">${role.role}</p>`;

      formattedRole.creation_date = `<p>${role.creation_date}</p>`;
      formattedRole.last_update_date = `<p>${role.last_update_date}</p>`;
      formattedRole.status = `<span class="badge badge-light-${role.status == 'active' ? 'success' : 
                              role.status == 'pending' ? 'warning' : ''}">${role.status.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</span>`;
      return formattedRole;
    });
  }

  openPermissionModal() {
    this.modalOpen = true;
  }

  handleModalOpen(value: boolean) {
    this.modalOpen = value;
  }
  
}
