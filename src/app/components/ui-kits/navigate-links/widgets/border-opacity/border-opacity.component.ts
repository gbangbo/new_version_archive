import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { opacity } from '../../../../../shared/data/ui-kits/navigate-links';

@Component({
  selector: 'app-border-opacity',
  imports: [CardComponent],
  templateUrl: './border-opacity.component.html',
  styleUrl: './border-opacity.component.scss'
})

export class BorderOpacityComponent {

  public opacity = opacity;
  
}
