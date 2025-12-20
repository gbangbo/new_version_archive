import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from '../../../../../shared/components/ui/svg-icon/svg-icon.component';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-svg-tooltip',
  imports: [CardComponent, SvgIconComponent, TooltipComponent],
  templateUrl: './svg-tooltip.component.html',
  styleUrl: './svg-tooltip.component.scss'
})

export class SvgTooltipComponent {

}
