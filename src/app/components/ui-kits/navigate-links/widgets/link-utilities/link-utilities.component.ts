import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { colorsTwo } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-link-utilities',
  imports: [CardComponent],
  templateUrl: './link-utilities.component.html',
  styleUrl: './link-utilities.component.scss'
})

export class LinkUtilitiesComponent {

  public colors = colorsTwo;

}
