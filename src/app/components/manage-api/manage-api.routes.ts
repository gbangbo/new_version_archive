import { Routes } from "@angular/router";

import { ManageApiComponent } from "./manage-api.component";

export const manageAPI: Routes = [
    {
        path: '',
        component: ManageApiComponent,
        data: {
            title: 'Manage API',
            breadcrumb: 'Manage API'
        }
    }
]