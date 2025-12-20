import { Routes } from "@angular/router";

import { Error403Component } from "./error-403/error-403.component";
import { Error404Component } from "./error-404/error-404.component";
import { Error500Component } from "./error-500/error-500.component";

export const error: Routes = [
    {
        path: '403',
        component: Error403Component
    },
    {
        path: '404',
        component: Error404Component
    },
    {
        path: '500',
        component: Error500Component
    }
]