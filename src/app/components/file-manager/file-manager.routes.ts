import { Routes } from "@angular/router";

import { FileManagerComponent } from "./file-manager.component";

export const filManager: Routes = [
  {
    path: '',
    component: FileManagerComponent,
    data: {
      title: 'File Manager',
      breadcrumb: 'File Manager',
    }
  }
]
