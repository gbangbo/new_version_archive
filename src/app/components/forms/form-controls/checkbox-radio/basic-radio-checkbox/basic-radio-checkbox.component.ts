import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { basicCheckbox, simpleRadio } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-basic-radio-checkbox',
  imports: [CardComponent],
  templateUrl: './basic-radio-checkbox.component.html',
  styleUrl: './basic-radio-checkbox.component.scss'
})

export class BasicRadioCheckboxComponent {

  public basicCheckbox = basicCheckbox;
  public simpleRadio = simpleRadio;

}
