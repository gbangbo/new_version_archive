import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-tooltip-html-element',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './tooltip-html-element.component.html',
  styleUrl: './tooltip-html-element.component.scss'
})

export class TooltipHtmlElementComponent {

}
