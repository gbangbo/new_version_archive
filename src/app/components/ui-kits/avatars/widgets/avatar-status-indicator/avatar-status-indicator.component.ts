import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { statusIndicatorAvatar } from '../../../../../shared/data/ui-kits/avatars';
import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-avatar-status-indicator',
  imports: [CommonModule, CardComponent],
  templateUrl: './avatar-status-indicator.component.html',
  styleUrl: './avatar-status-indicator.component.scss'
})

export class AvatarStatusIndicatorComponent {

  public statusIndicatorAvatar = statusIndicatorAvatar;

}
