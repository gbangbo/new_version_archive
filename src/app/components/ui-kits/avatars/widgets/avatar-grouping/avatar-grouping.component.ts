import { Component } from '@angular/core';

import { groupAvatar } from '../../../../../shared/data/ui-kits/avatars';
import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-avatar-grouping',
  imports: [CardComponent],
  templateUrl: './avatar-grouping.component.html',
  styleUrl: './avatar-grouping.component.scss'
})

export class AvatarGroupingComponent {

  public groupAvatar = groupAvatar;

}
