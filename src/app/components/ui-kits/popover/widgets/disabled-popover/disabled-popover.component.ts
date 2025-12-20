import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-disabled-popover',
  imports: [CardComponent],
  templateUrl: './disabled-popover.component.html',
  styleUrl: './disabled-popover.component.scss'
})

export class DisabledPopoverComponent {

  public popoverVisible: boolean = false;

  showPopover() {
    this.popoverVisible =! this.popoverVisible;
  }

}
