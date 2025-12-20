import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { values } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-margins',
  imports: [CardComponent],
  templateUrl: './margins.component.html',
  styleUrl: './margins.component.scss'
})

export class MarginsComponent {

  public margins = values;
  
}
