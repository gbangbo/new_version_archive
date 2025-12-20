import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-animated-ribbon',
  imports: [CardComponent, SvgIconComponent],
  templateUrl: './animated-ribbon.component.html',
  styleUrl: './animated-ribbon.component.scss'
})

export class AnimatedRibbonComponent {

}
