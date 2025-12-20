import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { switchIcon } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-switch-with-icons',
  imports: [CardComponent],
  templateUrl: './switch-with-icons.component.html',
  styleUrl: './switch-with-icons.component.scss'
})

export class SwitchWithIconsComponent {

  public switchIcon = switchIcon;

}
