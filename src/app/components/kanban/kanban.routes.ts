import { Routes } from '@angular/router';

import { KanbanComponent } from './kanban.component';

export const kanban: Routes = [
    {
        path: '',
        component: KanbanComponent,
        data : {
            pageTitle: "Kanban Board",
            title : "Kanban",
            breadcrumb: "Kanban"
        },
    },
];
