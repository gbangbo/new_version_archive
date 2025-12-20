import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { animatedAvatar } from '../../../../../shared/data/ui-kits/avatars';

@Component({
  selector: 'app-avatar-animated',
  imports: [CommonModule, CardComponent],
  templateUrl: './avatar-animated.component.html',
  styleUrl: './avatar-animated.component.scss'
})

export class AvatarAnimatedComponent {

  public animatedAvatar = animatedAvatar;

}
