import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { SizeModalComponent } from '../widgets/size-modal/size-modal.component';

@Component({
  selector: 'app-sizes-modals',
  imports: [CardComponent, SizeModalComponent],
  templateUrl: './sizes-modals.component.html',
  styleUrl: './sizes-modals.component.scss'
})

export class SizesModalsComponent {

  public fullscreenModalOpen: boolean = false;
  public extraLargeModalOpen: boolean = false;
  public largeModalOpen: boolean = false;
  public smallModalOpen: boolean = false;

  openModal(value: string) {
    if (value == 'fullScreen') {
      this.fullscreenModalOpen = true
    } else if (value == 'extraLarge') {
      this.extraLargeModalOpen = true
    } else if (value == 'large') {
      this.largeModalOpen = true
    } else if (value == 'small') {
      this.smallModalOpen = true
    }
  }

  handleOpenModal(value: boolean) {
    this.fullscreenModalOpen = value;
    this.extraLargeModalOpen = value;
    this.largeModalOpen = value;
    this.smallModalOpen = value;
  }
}
