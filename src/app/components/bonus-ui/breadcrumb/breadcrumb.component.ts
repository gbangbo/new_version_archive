import { Component } from '@angular/core';

import { DefaultBreadcrumbComponent } from "./widgets/default-breadcrumb/default-breadcrumb.component";
import { DividerBreadcrumbComponent } from "./widgets/divider-breadcrumb/divider-breadcrumb.component";
import { IconBreadcrumbComponent } from "./widgets/icon-breadcrumb/icon-breadcrumb.component";
import { VariationBreadcrumbComponent } from "./widgets/variation-breadcrumb/variation-breadcrumb.component";
import { ColoredBreadcrumbComponent } from "./widgets/colored-breadcrumb/colored-breadcrumb.component";

@Component({
  selector: 'app-breadcrumb',
  imports: [DefaultBreadcrumbComponent, DividerBreadcrumbComponent, IconBreadcrumbComponent, 
            VariationBreadcrumbComponent, ColoredBreadcrumbComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})

export class BreadcrumbComponent {

}
