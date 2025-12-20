import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { colorsTwo } from '../../../../../shared/data/ui-kits/helper-classes';

@Component({
  selector: 'app-link-underlines',
  imports: [TitleCasePipe, CardComponent],
  templateUrl: './link-underlines.component.html',
  styleUrl: './link-underlines.component.scss'
})

export class LinkUnderlinesComponent {

  public colors = colorsTwo;
  
}
