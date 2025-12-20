import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { SimpleModalComponent } from '../widgets/simple-modal/simple-modal.component';
import { ScrollingContentModalComponent } from '../widgets/scrolling-content-modal/scrolling-content-modal.component';
import { TooltipPopoverModalComponent } from '../widgets/tooltip-popover-modal/tooltip-popover-modal.component';
import { CubaSignupModalComponent } from '../widgets/cuba-signup-modal/cuba-signup-modal.component';

@Component({
  selector: 'app-basic-modals',
  imports: [CardComponent, SimpleModalComponent, ScrollingContentModalComponent, TooltipPopoverModalComponent, CubaSignupModalComponent],
  templateUrl: './basic-modals.component.html',
  styleUrl: './basic-modals.component.scss'
})

export class BasicModalsComponent {

  public simpleModalOpen: boolean = false;
  public scrollingModalOpen: boolean = false;
  public tooltipPopoverModalOpen: boolean = false;
  public cubaModalOpen: boolean = false;

  openSimpleModal() {
    this.simpleModalOpen = true
  }

  openScrollingModal() {
    this.scrollingModalOpen  = true
  }

  openTooltipPopoverModal() {
    this.tooltipPopoverModalOpen = true
  }

  openCubaModal() {
    this.cubaModalOpen = true
  }
  
  handleOpenSimpleModal(value: boolean) {
    this.simpleModalOpen = value;
    this.scrollingModalOpen = value;
    this.tooltipPopoverModalOpen = value;
    this.cubaModalOpen = value;
  }
  
}
