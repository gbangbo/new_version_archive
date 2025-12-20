import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { customSwitch } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-custom-switch',
  imports: [CardComponent],
  templateUrl: './custom-switch.component.html',
  styleUrl: './custom-switch.component.scss'
})

export class CustomSwitchComponent {

  public customSwitch = customSwitch;
  
}
