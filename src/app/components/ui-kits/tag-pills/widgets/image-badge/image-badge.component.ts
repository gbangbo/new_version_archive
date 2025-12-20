import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { imageBadge } from '../../../../../shared/data/ui-kits/badge';

@Component({
  selector: 'app-image-badge',
  imports: [CardComponent],
  templateUrl: './image-badge.component.html',
  styleUrl: './image-badge.component.scss'
})

export class ImageBadgeComponent {

  public imageBadge = imageBadge;
  
}
