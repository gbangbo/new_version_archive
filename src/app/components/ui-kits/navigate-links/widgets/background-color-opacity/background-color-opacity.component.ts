import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { bgColor } from '../../../../../shared/data/ui-kits/navigate-links';

@Component({
  selector: 'app-background-color-opacity',
  imports: [CardComponent],
  templateUrl: './background-color-opacity.component.html',
  styleUrl: './background-color-opacity.component.scss'
})

export class BackgroundColorOpacityComponent {

  public bgColor = bgColor;

}
