import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { buttonSize } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-outline-button-sizes',
  imports: [CardComponent],
  templateUrl: './outline-button-sizes.component.html',
  styleUrl: './outline-button-sizes.component.scss'
})

export class OutlineButtonSizesComponent {

  public buttonSize = buttonSize;

}
