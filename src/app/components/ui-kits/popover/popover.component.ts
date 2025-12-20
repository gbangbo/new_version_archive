import { Component } from '@angular/core';

import { BasicPopoverComponent } from "./widgets/basic-popover/basic-popover.component";
import { DelayPopoverComponent } from "./widgets/delay-popover/delay-popover.component";
import { DisabledPopoverComponent } from "./widgets/disabled-popover/disabled-popover.component";
import { DismissiblePopoverComponent } from "./widgets/dismissible-popover/dismissible-popover.component";
import { PopoverDirectionsComponent } from "./widgets/popover-directions/popover-directions.component";

@Component({
  selector: 'app-popover',
  imports: [BasicPopoverComponent, DisabledPopoverComponent, DelayPopoverComponent,
            DismissiblePopoverComponent, PopoverDirectionsComponent],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss'
})
export class PopoverComponent {

}
