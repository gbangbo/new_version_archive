import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { badgeIndicatorAvatar } from '../../../../../shared/data/ui-kits/avatars';

@Component({
  selector: 'app-avatar-badge',
  imports: [CommonModule, CardComponent],
  templateUrl: './avatar-badge.component.html',
  styleUrl: './avatar-badge.component.scss'
})

export class AvatarBadgeComponent {

  public badgeIndicatorAvatar = badgeIndicatorAvatar;

}
