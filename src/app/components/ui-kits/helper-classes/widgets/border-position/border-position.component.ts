import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { borderPosition, colorsTwo } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-border-position',
  imports: [CardComponent],
  templateUrl: './border-position.component.html',
  styleUrl: './border-position.component.scss'
})

export class BorderPositionComponent {

  public colors = colorsTwo;
  public borderPosition = borderPosition;

}
