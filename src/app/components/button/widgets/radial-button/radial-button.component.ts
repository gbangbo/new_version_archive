import { Component } from '@angular/core';

import { radialButton } from '../../../../shared/data/buttons';
import { CardComponent } from "../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-radial-button',
  imports: [CardComponent],
  templateUrl: './radial-button.component.html',
  styleUrl: './radial-button.component.scss'
})

export class RadialButtonComponent {

  public radialButton = radialButton;

}
