import { Routes } from "@angular/router";

import { SamplePageComponent } from "./sample-page.component";

export const samplePage: Routes = [
    {
        path: '',
        component: SamplePageComponent,
        data: {
            title:'Sample Page',
            breadcrumb: 'Sample Page'
        }
    }
]