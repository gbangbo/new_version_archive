import { Component, EventEmitter, HostListener, Output } from '@angular/core';

import { TooltipComponent } from "../../../../../shared/components/ui/tooltip/tooltip.component";
import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-tooltip-popover-modal',
  imports: [OutsideDirective, TooltipComponent],
  templateUrl: './tooltip-popover-modal.component.html',
  styleUrl: './tooltip-popover-modal.component.scss'
})

export class TooltipPopoverModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public popoverVisible: boolean = false;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen.emit(false);
  }

  handlePopover() {
    this.popoverVisible =! this.popoverVisible;
  }
  
}
