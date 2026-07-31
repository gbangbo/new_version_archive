import { Routes } from "@angular/router";

import { DomaineComponent } from "./domaine/domaine.component";
import { CleApiComponent } from "./cle-api/cle-api.component";

export const task: Routes = [
    {
        path: '',
        redirectTo: 'domaine',
        pathMatch: 'full'
    },
    {
        path: 'domaine',
        component: DomaineComponent,
        data: {
            title: 'Domaines autorisés',
            breadcrumb: 'Domaines autorisés'
        }
    },
    {
        path: 'cle-api',
        component: CleApiComponent,
        data: {
            title: 'Clés API',
            breadcrumb: 'Clés API'
        }
    }
]
