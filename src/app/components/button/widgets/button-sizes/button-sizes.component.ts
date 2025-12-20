import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { buttonSize } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-button-sizes',
  imports: [CardComponent],
  templateUrl: './button-sizes.component.html',
  styleUrl: './button-sizes.component.scss'
})

export class ButtonSizesComponent {

  public buttonSize = buttonSize;

}
