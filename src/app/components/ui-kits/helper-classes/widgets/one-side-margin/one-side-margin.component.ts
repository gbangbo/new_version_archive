import { Component } from '@angular/core';

import { oneSideMargin, values } from '../../../../../shared/data/ui-kits/helper-classes';
import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-one-side-margin',
  imports: [CardComponent],
  templateUrl: './one-side-margin.component.html',
  styleUrl: './one-side-margin.component.scss'
})

export class OneSideMarginComponent {

  public oneSideMargin = oneSideMargin;
  public margins = values;

}
