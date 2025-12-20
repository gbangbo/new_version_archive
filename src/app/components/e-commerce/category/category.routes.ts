import { Routes } from "@angular/router";

import { CategoryComponent } from "./category.component";

export const category: Routes = [
  {
    path: '',
    component: CategoryComponent,
    data: {
      title: 'Category',
      breadcrumb: 'Category'
    }
  }
]
