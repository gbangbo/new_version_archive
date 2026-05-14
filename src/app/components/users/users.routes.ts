import {Routes} from "@angular/router";

import {UserProfileComponent} from "./user-profile/user-profile.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserCardsComponent} from "./user-cards/user-cards.component";
import {RolesPermissionComponent} from "./roles-permission/roles-permission.component";
import {CarrierePersonnelComponent} from "./carriere-personnel/carriere-personnel.component";
import {FonctionPosteComponent} from "./fonction-poste/fonction-poste.component";

export const users: Routes = [
    {
        path: 'user-profile/:id',
        component: UserProfileComponent,
        data: {
            title: 'Profil utilisateur',
            breadcrumb: 'Profil utilisateur'
        }
    },
    {
        path: 'add-user',
        component: AddUserComponent,
        data: {
            title: 'Personnel',
            breadcrumb: 'Personnel'
        }
    },
    {
        path: 'carriere-personnele',
        component: CarrierePersonnelComponent,
        data: {
            title: 'Personnel & Carrière',
            breadcrumb: 'Personnel & Carrière'
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
    },
    {
        path: 'fonction',
        component: FonctionPosteComponent,
        data: {
            title: 'Fonction',
            breadcrumb: 'Fonction'
        }
    }
]
