import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { oneSidePadding, values } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-one-side-padding',
  imports: [CardComponent],
  templateUrl: './one-side-padding.component.html',
  styleUrl: './one-side-padding.component.scss'
})

export class OneSidePaddingComponent {

  public oneSidePadding = oneSidePadding;
  public paddings = values;

}
