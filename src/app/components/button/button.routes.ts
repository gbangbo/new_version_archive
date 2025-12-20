import { Routes } from "@angular/router";

import { ButtonComponent } from "./button.component";

export const button: Routes = [
    {
        path: '',
        component: ButtonComponent,
        data: {
            title: 'Buttons',
            breadcrumb: 'Buttons'
        }
    }
]