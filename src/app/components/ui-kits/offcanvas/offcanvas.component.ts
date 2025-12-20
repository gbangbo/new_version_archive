import { Component } from '@angular/core';

import { InitialOffcanvasComponent } from "./widgets/initial-offcanvas/initial-offcanvas.component";
import { OffcanvasDirectionComponent } from "./widgets/offcanvas-direction/offcanvas-direction.component";
import { OffcanvasVariationComponent } from "./widgets/offcanvas-variation/offcanvas-variation.component";

@Component({
  selector: 'app-offcanvas',
  imports: [InitialOffcanvasComponent, OffcanvasDirectionComponent, OffcanvasVariationComponent],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.scss'
})

export class OffcanvasComponent {

}
