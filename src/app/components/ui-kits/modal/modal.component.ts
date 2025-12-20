import { Component } from '@angular/core';

import { BasicModalsComponent } from "./basic-modals/basic-modals.component";
import { SizesModalsComponent } from "./sizes-modals/sizes-modals.component";
import { FullScreenModalsComponent } from "./full-screen-modals/full-screen-modals.component";
import { CenteredModalComponent } from "./centered-modal/centered-modal.component";
import { ToggleBetweenModalComponent } from "./toggle-between-modal/toggle-between-modal.component";
import { StaticBackdropModalComponent } from "./static-backdrop-modal/static-backdrop-modal.component";
import { GridModalComponent } from "./grid-modal/grid-modal.component";
import { ScrollingLongContentModalComponent } from "./scrolling-long-content-modal/scrolling-long-content-modal.component";
import { CubaCustomModalsComponent } from "./cuba-custom-modals/cuba-custom-modals.component";

@Component({
  selector: 'app-modal',
  imports: [BasicModalsComponent, SizesModalsComponent, FullScreenModalsComponent,
            CenteredModalComponent, ToggleBetweenModalComponent, StaticBackdropModalComponent,
            GridModalComponent, ScrollingLongContentModalComponent, CubaCustomModalsComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})

export class ModalComponent {

}
