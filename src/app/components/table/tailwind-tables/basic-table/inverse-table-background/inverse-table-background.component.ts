import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { inverseTableBackground } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-inverse-table-background',
  imports: [CardComponent],
  templateUrl: './inverse-table-background.component.html',
  styleUrl: './inverse-table-background.component.scss'
})

export class InverseTableBackgroundComponent {

  public inverseTableBackground = inverseTableBackground;

}
