import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { SizeModalComponent } from '../widgets/size-modal/size-modal.component';

@Component({
  selector: 'app-full-screen-modals',
  imports: [CardComponent, SizeModalComponent],
  templateUrl: './full-screen-modals.component.html',
  styleUrl: './full-screen-modals.component.scss'
})

export class FullScreenModalsComponent {

  public fullscreenModalOpen: boolean = false;
  public fullscreenBelowSmModalOpen: boolean = false;
  public fullscreenBelowMdModalOpen: boolean = false;
  public fullscreenBelowLgModalOpen: boolean = false;
  public fullscreenBelowXlModalOpen: boolean = false; 
  public fullscreenBelowXxlModalOpen: boolean = false;

  openModal(value: string) {

    if(value == 'fullScreen') {
      this.fullscreenModalOpen = true
    } else if(value == 'below-sm') {
      this.fullscreenBelowSmModalOpen = true
    } else if(value == 'below-md') {
      this.fullscreenBelowMdModalOpen = true
    } else if(value == 'below-lg') {
      this.fullscreenBelowLgModalOpen = true
    } else if(value == 'below-xl') {
      this.fullscreenBelowXlModalOpen = true
    } else if(value == 'below-xxl') {
      this.fullscreenBelowXxlModalOpen  =true 
    }
  }

  handleOpenModal(value: boolean) {
    this.fullscreenModalOpen = value;
    this.fullscreenBelowSmModalOpen = value;
    this.fullscreenBelowMdModalOpen = value;
    this.fullscreenBelowLgModalOpen = value;
    this.fullscreenBelowXlModalOpen = value;
    this.fullscreenBelowXxlModalOpen = value;
  }
  
}
