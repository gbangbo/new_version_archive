import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { letterAvatar } from '../../../../../shared/data/ui-kits/avatars';

@Component({
  selector: 'app-avatar-latter',
  imports: [CardComponent],
  templateUrl: './avatar-latter.component.html',
  styleUrl: './avatar-latter.component.scss'
})

export class AvatarLatterComponent {

  public letterAvatar = letterAvatar;

}
