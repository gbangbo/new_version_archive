import { Component } from '@angular/core';

import { BasicTooltipComponent } from "./widgets/basic-tooltip/basic-tooltip.component";
import { ColoredTooltipComponent } from "./widgets/colored-tooltip/colored-tooltip.component";
import { LightTooltipComponent } from "./widgets/light-tooltip/light-tooltip.component";
import { TooltipDirectionComponent } from "./widgets/tooltip-direction/tooltip-direction.component";
import { TooltipHtmlElementComponent } from "./widgets/tooltip-html-element/tooltip-html-element.component";
import { TooltipOutlinedComponent } from "./widgets/tooltip-outlined/tooltip-outlined.component";
import { DisabledTooltipComponent } from "./widgets/disabled-tooltip/disabled-tooltip.component";
import { SvgTooltipComponent } from "./widgets/svg-tooltip/svg-tooltip.component";
import { IconTooltipComponent } from "./widgets/icon-tooltip/icon-tooltip.component";

@Component({
  selector: 'app-tooltip',
  imports: [BasicTooltipComponent, ColoredTooltipComponent, LightTooltipComponent,
            TooltipDirectionComponent, TooltipHtmlElementComponent, TooltipOutlinedComponent, 
            DisabledTooltipComponent, SvgTooltipComponent, IconTooltipComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})

export class TooltipComponent {

}
