import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { switchSizing } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-switch-sizing',
  imports: [CardComponent],
  templateUrl: './switch-sizing.component.html',
  styleUrl: './switch-sizing.component.scss'
})

export class SwitchSizingComponent {

  public switchSizing = switchSizing;

}
