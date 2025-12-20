import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { profileScrollbar } from '../../../../../shared/data/bonus-ui/scrollbar';

@Component({
  selector: 'app-profile-scrollbar',
  imports: [NgScrollbarModule, CardComponent],
  templateUrl: './profile-scrollbar.component.html',
  styleUrl: './profile-scrollbar.component.scss'
})

export class ProfileScrollbarComponent {

  public profileScrollbar = profileScrollbar;

}
