import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CommonSwitch } from '../../../../../shared/interface/form-widgets';

@Component({
  selector: 'app-common-switch',
  imports: [CardComponent],
  templateUrl: './common-switch.component.html',
  styleUrl: './common-switch.component.scss'
})

export class CommonSwitchComponent {

  @Input() switch: CommonSwitch;

}
