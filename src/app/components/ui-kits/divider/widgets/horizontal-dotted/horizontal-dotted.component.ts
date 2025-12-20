import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { horizontalDottedDivider } from '../../../../../shared/data/ui-kits/divider';

@Component({
  selector: 'app-horizontal-dotted',
  imports: [TitleCasePipe, CardComponent],
  templateUrl: './horizontal-dotted.component.html',
  styleUrl: './horizontal-dotted.component.scss'
})

export class HorizontalDottedComponent {

  public horizontalDottedDivider = horizontalDottedDivider;

}
