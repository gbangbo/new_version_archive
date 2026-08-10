import {Routes} from "@angular/router";

import {ViaApiComponent} from "./via-api/via-api.component";
import {ExecutionSqlComponent} from "./execution-sql/execution-sql.component";

export const task: Routes = [
    {
        path: '',
        redirectTo: 'com-via-api',
        pathMatch: 'full'
    },
    {
        path: 'com-via-api',
        component: ViaApiComponent,
        data: {
            title: 'Communication via API',
            breadcrumb: 'Communication via API'
        }
    },
    {
        path: 'execution-sql',
        component: ExecutionSqlComponent,
        data: {
            title: 'Execution manuelle de requête',
            breadcrumb: 'Execution manuelle de requête'
        }
    }
]
