import { Routes } from "@angular/router";

import { EcommerceSettingComponent } from "./ecommerce-setting.component";

export const setting: Routes = [
  {
    path: '',
    component: EcommerceSettingComponent,
    data: {
      title: 'Settings',
      breadcrumb: 'Settings'
    }
  }
]
