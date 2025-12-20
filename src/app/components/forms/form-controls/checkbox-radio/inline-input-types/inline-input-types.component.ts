import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { inlineCheckbox, inlineRadio, inlineSwitch } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-inline-input-types',
  imports: [CardComponent],
  templateUrl: './inline-input-types.component.html',
  styleUrl: './inline-input-types.component.scss'
})

export class InlineInputTypesComponent {

  public inlineCheckbox = inlineCheckbox;
  public inlineRadio = inlineRadio;
  public inlineSwitch = inlineSwitch;

}
