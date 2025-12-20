import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { sizeAvatar } from '../../../../../shared/data/ui-kits/avatars';

@Component({
  selector: 'app-avatar-size',
  imports: [CommonModule, CardComponent,],
  templateUrl: './avatar-size.component.html',
  styleUrl: './avatar-size.component.scss'
})

export class AvatarSizeComponent {

  public sizeAvatar = sizeAvatar;

}
