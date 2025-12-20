import { Routes } from "@angular/router";

import { GeneralComponent } from "./general/general.component";
import { ChartsComponent } from "./charts/charts.component";

export const widgets: Routes = [
    {
        path: 'general',
        component: GeneralComponent,
        data : {
            pageTitle: "General Widgets",
            title : "General",
            breadcrumb: "General"
        },
    },
    {
        path: 'charts',
        component: ChartsComponent,
        data : {
            title : "Chart",
            breadcrumb: "Chart"
        },
    }
]
