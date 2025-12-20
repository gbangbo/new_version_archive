import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-dismissible-popover',
  imports: [CardComponent],
  templateUrl: './dismissible-popover.component.html',
  styleUrl: './dismissible-popover.component.scss'
})

export class DismissiblePopoverComponent {

  public popoverVisible: boolean = false;

  showPopover() {
    this.popoverVisible = true;
  }
  
}
