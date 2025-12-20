import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-delay-popover',
  imports: [OutsideDirective, CardComponent],
  templateUrl: './delay-popover.component.html',
  styleUrl: './delay-popover.component.scss'
})

export class DelayPopoverComponent {

  public popoverVisible: boolean = false;

  showPopover() {
    if(!this.popoverVisible) {
      setTimeout(() => {
        this.popoverVisible = true;
      }, 1500);
    } else {
      this.popoverVisible = false;
    }
  }

  handlePopover() {
    if(this.popoverVisible) {
      this.popoverVisible = false;
    }
  }

}
