import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { disabledOutlineSwitch } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-disabled-outline-switch',
  imports: [CardComponent],
  templateUrl: './disabled-outline-switch.component.html',
  styleUrl: './disabled-outline-switch.component.scss'
})

export class DisabledOutlineSwitchComponent {

  public disabledOutlineSwitch = disabledOutlineSwitch;

}
