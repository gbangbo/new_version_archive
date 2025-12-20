import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-basic-tooltip',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './basic-tooltip.component.html',
  styleUrl: './basic-tooltip.component.scss'
})

export class BasicTooltipComponent {

}
