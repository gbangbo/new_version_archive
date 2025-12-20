import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { roundedSize } from '../../../../shared/data/buttons';

@Component({
  selector: 'app-rounded-sizes',
  imports: [CardComponent],
  templateUrl: './rounded-sizes.component.html',
  styleUrl: './rounded-sizes.component.scss'
})

export class RoundedSizesComponent {

  public roundedSize = roundedSize;

}
