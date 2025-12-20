import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { simpleDivider } from '../../../../../shared/data/ui-kits/divider';

@Component({
  selector: 'app-vertical-simple',
  imports: [CardComponent],
  templateUrl: './vertical-simple.component.html',
  styleUrl: './vertical-simple.component.scss'
})

export class VerticalSimpleComponent {

  public simpleDivider = simpleDivider;

}
