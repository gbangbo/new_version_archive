import { Routes } from "@angular/router";

import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserCardsComponent } from "./user-cards/user-cards.component";
import { RolesPermissionComponent } from "./roles-permission/roles-permission.component";

export const users: Routes = [
  {
    path: 'user-profile/:id',
    component: UserProfileComponent,
    data: {
      title: 'User Profile',
      breadcrumb: 'User Profile'
    }
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    data: {
      title: 'Add User',
      breadcrumb: 'Add User'
    }
  },
  {
    path: 'user-list',
    component: UserListComponent,
    data: {
      title: 'User List',
      breadcrumb: 'User List'
    }
  },
  {
    path: 'user-cards',
    component: UserCardsComponent,
    data: {
      title: 'User Cards',
      breadcrumb: 'User Cards'
    }
  },
  {
    path: 'roles-permission',
    component: RolesPermissionComponent,
    data: {
      title: 'Roles & Permission',
      breadcrumb: 'Roles & Permission'
    }
  }
]
