import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-tooltip-direction',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './tooltip-direction.component.html',
  styleUrl: './tooltip-direction.component.scss'
})

export class TooltipDirectionComponent {

}
