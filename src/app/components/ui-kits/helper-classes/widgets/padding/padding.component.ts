import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { values } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-padding',
  imports: [CardComponent],
  templateUrl: './padding.component.html',
  styleUrl: './padding.component.scss'
})

export class PaddingComponent {

  public paddings = values;

}
