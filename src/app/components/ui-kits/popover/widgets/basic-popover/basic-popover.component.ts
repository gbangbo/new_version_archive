import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-basic-popover',
  imports: [OutsideDirective, CardComponent],
  templateUrl: './basic-popover.component.html',
  styleUrl: './basic-popover.component.scss'
})

export class BasicPopoverComponent {

  public popoverVisible: boolean = false;

  showPopover() {
    this.popoverVisible =! this.popoverVisible;
  }

  handlePopover() {
    this.popoverVisible = false;
  }
  
}
