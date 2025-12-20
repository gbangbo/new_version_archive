import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { imageBadge } from '../../../../../shared/data/ui-kits/badge';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';

@Component({
  selector: 'app-image-close-badge',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './image-close-badge.component.html',
  styleUrl: './image-close-badge.component.scss'
})

export class ImageCloseBadgeComponent {

  public imageBadge = imageBadge;
  
}
