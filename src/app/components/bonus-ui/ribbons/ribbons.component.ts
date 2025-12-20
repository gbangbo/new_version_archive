import { Component } from '@angular/core';

import { LeftRibbonComponent } from "./widgets/left-ribbon/left-ribbon.component";
import { RightRibbonComponent } from "./widgets/right-ribbon/right-ribbon.component";
import { AnimatedRibbonComponent } from "./widgets/animated-ribbon/animated-ribbon.component";

@Component({
  selector: 'app-ribbons',
  imports: [LeftRibbonComponent, RightRibbonComponent, AnimatedRibbonComponent],
  templateUrl: './ribbons.component.html',
  styleUrl: './ribbons.component.scss'
})

export class RibbonsComponent {

}
