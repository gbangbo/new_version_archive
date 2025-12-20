import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-tooltip-outlined',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './tooltip-outlined.component.html',
  styleUrl: './tooltip-outlined.component.scss'
})

export class TooltipOutlinedComponent {

}
