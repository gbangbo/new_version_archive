import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { rightRibbons } from '../../../../../shared/data/bonus-ui/ribbons';

@Component({
  selector: 'app-right-ribbon',
  imports: [CardComponent],
  templateUrl: './right-ribbon.component.html',
  styleUrl: './right-ribbon.component.scss'
})

export class RightRibbonComponent {

  public rightRibbons = rightRibbons;

}
