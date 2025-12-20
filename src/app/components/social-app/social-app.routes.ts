import { Routes } from "@angular/router";

import { SocialAppComponent } from "./social-app.component";

export const socialApp: Routes = [
    {
        path: '',
        component: SocialAppComponent,
        data: {
            title: 'Social App',
            breadcrumb: 'Social App'
        }
    }
]