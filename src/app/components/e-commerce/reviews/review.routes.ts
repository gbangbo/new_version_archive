import { Routes } from "@angular/router";

import { ReviewsComponent } from "./reviews.component";

export const review: Routes = [
  {
    path: '',
    component: ReviewsComponent,
    data: {
      title: 'Manage Review',
      breadcrumb: 'Manage Review'
    }
  }
]
