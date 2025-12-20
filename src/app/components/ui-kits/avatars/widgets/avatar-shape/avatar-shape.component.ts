import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { shapeAvatar } from '../../../../../shared/data/ui-kits/avatars';

@Component({
  selector: 'app-avatar-shape',
  imports: [CardComponent],
  templateUrl: './avatar-shape.component.html',
  styleUrl: './avatar-shape.component.scss'
})

export class AvatarShapeComponent {

  public shapeAvatar = shapeAvatar;

}

