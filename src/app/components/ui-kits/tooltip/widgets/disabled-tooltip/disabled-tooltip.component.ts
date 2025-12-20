import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-disabled-tooltip',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './disabled-tooltip.component.html',
  styleUrl: './disabled-tooltip.component.scss'
})

export class DisabledTooltipComponent {

}
