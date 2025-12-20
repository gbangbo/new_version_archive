import { Routes } from "@angular/router";

import { AnimateComponent } from "./animate/animate.component";

export const animation: Routes = [
    {
        path: 'animate',
        component: AnimateComponent,
        data: {
            title: 'Animate',
            breadcrumb: 'Animate'
        }
    }
]