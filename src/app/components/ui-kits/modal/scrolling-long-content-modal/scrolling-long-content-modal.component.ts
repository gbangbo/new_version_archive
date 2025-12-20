import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from '../../../../shared/components/ui/feather-icon/feather-icon.component';
import { modalContent } from '../../../../shared/data/ui-kits/modal';
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-scrolling-long-content-modal',
  imports: [CommonModule, CardComponent, FeatherIconComponent,OutsideDirective],
  templateUrl: './scrolling-long-content-modal.component.html',
  styleUrl: './scrolling-long-content-modal.component.scss'
})

export class ScrollingLongContentModalComponent {

  public modalContent = modalContent;
  public modalOpen: boolean = false

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  openModal() {
    this.modalOpen = true
  }

  closeModal() {
    this.modalOpen = false
  }
  
}
