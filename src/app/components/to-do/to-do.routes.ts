import { Routes } from "@angular/router";

import { ToDoComponent } from "./to-do.component";

export const todo: Routes = [
    {
        path: '',
        component: ToDoComponent,
        data: {
            title: 'To-Do',
            breadcrumb: 'To-Do'
        }
    }
]