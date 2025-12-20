import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../shared/components/ui/svg-icon/svg-icon.component";
import { users } from '../../../../shared/data/user';

@Component({
  selector: 'app-social-app-friends',
  imports: [RouterModule, CardComponent, SvgIconComponent],
  templateUrl: './social-app-friends.component.html',
  styleUrl: './social-app-friends.component.scss'
})

export class SocialAppFriendsComponent {

  public users = users;

}
