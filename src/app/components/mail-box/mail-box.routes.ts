import { Routes } from "@angular/router";

import { MailBoxComponent } from "./mail-box.component";

export const mail: Routes = [
  {
    path: '',
    component: MailBoxComponent,
    data: {
      title: 'Mail Box',
      breadcrumb: 'Mail Box'
    }
  }
]
