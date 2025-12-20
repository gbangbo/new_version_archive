import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { horizontalEditable } from '../../../../../shared/data/ui-kits/divider';

@Component({
  selector: 'app-horizontal-editable',
  imports: [CardComponent],
  templateUrl: './horizontal-editable.component.html',
  styleUrl: './horizontal-editable.component.scss'
})

export class HorizontalEditableComponent {

  public horizontalEditable = horizontalEditable;
  
}
