import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { defaultRadio } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-default-radio-button',
  imports: [CardComponent],
  templateUrl: './default-radio-button.component.html',
  styleUrl: './default-radio-button.component.scss'
})

export class DefaultRadioButtonComponent {

  public defaultRadio = defaultRadio;

}
