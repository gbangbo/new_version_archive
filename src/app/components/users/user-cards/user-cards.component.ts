import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { users } from '../../../shared/data/user';
import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../shared/components/ui/svg-icon/svg-icon.component";

@Component({
  selector: 'app-user-cards',
  imports: [RouterModule, CardComponent, SvgIconComponent],
  templateUrl: './user-cards.component.html',
  styleUrl: './user-cards.component.scss'
})

export class UserCardsComponent {

  public users = users;

}
