import { Routes } from "@angular/router";

import { TaskComponent } from "./task.component";

export const task: Routes = [
    {
        path: '',
        component: TaskComponent,
        data: {
            title: 'Tasks',
            breadcrumb: 'Tasks'
        }
    }
]