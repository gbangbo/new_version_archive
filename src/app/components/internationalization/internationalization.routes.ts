import { Routes } from "@angular/router";

import { InternationalizationComponent } from './internationalization.component';

export const internationalization: Routes = [
    {
        path: '',
        component: InternationalizationComponent,
        data: {
            title: 'Internationalization',
            breadcrumb: 'Internationalization'
        }
    }
]