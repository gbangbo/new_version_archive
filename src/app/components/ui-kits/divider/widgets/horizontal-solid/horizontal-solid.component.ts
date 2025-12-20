import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { horizontalSolidDivider } from '../../../../../shared/data/ui-kits/divider';

@Component({
  selector: 'app-horizontal-solid',
  imports: [TitleCasePipe, CardComponent],
  templateUrl: './horizontal-solid.component.html',
  styleUrl: './horizontal-solid.component.scss'
})

export class HorizontalSolidComponent {

  public horizontalSolidDivider = horizontalSolidDivider;
  
}
