import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { simpleDivider } from '../../../../../shared/data/ui-kits/divider';

@Component({
  selector: 'app-horizontal-simple',
  imports: [CardComponent],
  templateUrl: './horizontal-simple.component.html',
  styleUrl: './horizontal-simple.component.scss'
})

export class HorizontalSimpleComponent {

  public simpleDivider = simpleDivider;
  
}
