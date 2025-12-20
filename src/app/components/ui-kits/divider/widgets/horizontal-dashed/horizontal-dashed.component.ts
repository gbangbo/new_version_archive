import { Component } from '@angular/core';

import { horizontalDashedDivider } from '../../../../../shared/data/ui-kits/divider';
import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-horizontal-dashed',
  imports: [CardComponent],
  templateUrl: './horizontal-dashed.component.html',
  styleUrl: './horizontal-dashed.component.scss'
})

export class HorizontalDashedComponent {

  public horizontalDashedDivider = horizontalDashedDivider;

}
