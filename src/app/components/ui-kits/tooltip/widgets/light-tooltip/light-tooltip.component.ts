import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-light-tooltip',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './light-tooltip.component.html',
  styleUrl: './light-tooltip.component.scss'
})

export class LightTooltipComponent {

}
