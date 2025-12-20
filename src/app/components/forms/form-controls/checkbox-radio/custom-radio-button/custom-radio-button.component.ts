import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { borderedRadio, filledRadio, iconsRadio } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-custom-radio-button',
  imports: [CardComponent],
  templateUrl: './custom-radio-button.component.html',
  styleUrl: './custom-radio-button.component.scss'
})

export class CustomRadioButtonComponent {

  public borderedRadio = borderedRadio;
  public iconsRadio = iconsRadio;
  public filledRadio = filledRadio;

}
