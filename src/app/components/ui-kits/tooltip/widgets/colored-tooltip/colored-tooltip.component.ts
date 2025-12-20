import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-colored-tooltip',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './colored-tooltip.component.html',
  styleUrl: './colored-tooltip.component.scss'
})

export class ColoredTooltipComponent {

}
