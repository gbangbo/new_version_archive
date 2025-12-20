import { Routes } from "@angular/router";

import { CreateProjectComponent } from "./create-project/create-project.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { ProjectListComponent } from "./project-list/project-list.component";

export const project: Routes = [
    {
        path: 'project-details',
        component: ProjectDetailsComponent,
        data: {
            title: "Project Details",
            breadcrumb: "Project Details"
        },
    },
    {
        path: 'project-list',
        component: ProjectListComponent,
        data: {
            title: "Project List",
            breadcrumb: "Project List"
        },
    },
    {
        path: 'create-project',
        component: CreateProjectComponent,
        data: {
            title: "Project Create",
            breadcrumb: "Project Create"
        },
    }
]
