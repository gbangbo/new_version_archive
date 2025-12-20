import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-popover-directions',
  imports: [CardComponent],
  templateUrl: './popover-directions.component.html',
  styleUrl: './popover-directions.component.scss'
})

export class PopoverDirectionsComponent {

  public topPopoverVisible: boolean = false;
  public rightPopoverVisible: boolean = false;
  public bottomPopoverVisible: boolean = false;
  public leftPopoverVisible: boolean = false;
  public popoverVisible: { [key: string]: boolean } = {};

  handlePopover(direction: string) {
    this.popoverVisible[direction] =! this.popoverVisible[direction];
  }

}
