import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { defaultSwitch } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-default-switch',
  imports: [CardComponent],
  templateUrl: './default-switch.component.html',
  styleUrl: './default-switch.component.scss'
})

export class DefaultSwitchComponent {

  public defaultSwitch = defaultSwitch;

}
