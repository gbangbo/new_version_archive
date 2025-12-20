import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { leftRibbons } from '../../../../../shared/data/bonus-ui/ribbons';

@Component({
  selector: 'app-left-ribbon',
  imports: [CardComponent],
  templateUrl: './left-ribbon.component.html',
  styleUrl: './left-ribbon.component.scss'
})

export class LeftRibbonComponent {

  public leftRibbons = leftRibbons;

}
