import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { ratioAvatar } from '../../../../../shared/data/ui-kits/avatars';

@Component({
  selector: 'app-avatar-ratio',
  imports: [CardComponent],
  templateUrl: './avatar-ratio.component.html',
  styleUrl: './avatar-ratio.component.scss'
})

export class AvatarRatioComponent {

  public ratioAvatar = ratioAvatar;
  
}
