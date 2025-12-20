import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { roundedSize } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-outline-rounded-sizes',
  imports: [CardComponent],
  templateUrl: './outline-rounded-sizes.component.html',
  styleUrl: './outline-rounded-sizes.component.scss'
})

export class OutlineRoundedSizesComponent {

  public roundedSize = roundedSize;

}
