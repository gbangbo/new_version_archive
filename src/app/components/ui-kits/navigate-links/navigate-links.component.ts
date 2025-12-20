import { Component } from '@angular/core';

import { LinkUtilitiesComponent } from "./widgets/link-utilities/link-utilities.component";
import { LinkUnderlinesComponent } from "./widgets/link-underlines/link-underlines.component";
import { BorderOpacityComponent } from "./widgets/border-opacity/border-opacity.component";
import { BackgroundColorOpacityComponent } from "./widgets/background-color-opacity/background-color-opacity.component";
import { CommonLinksComponent } from "./widgets/common-links/common-links.component";

@Component({
  selector: 'app-navigate-links',
  imports: [LinkUtilitiesComponent, LinkUnderlinesComponent, BorderOpacityComponent,
            BackgroundColorOpacityComponent, CommonLinksComponent],
  templateUrl: './navigate-links.component.html',
  styleUrl: './navigate-links.component.scss'
})

export class NavigateLinksComponent {

}
