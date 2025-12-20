import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-icon-tooltip',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './icon-tooltip.component.html',
  styleUrl: './icon-tooltip.component.scss'
})

export class IconTooltipComponent {

}
