import { Component } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { badgeScrollbar } from '../../../../../shared/data/bonus-ui/scrollbar';

@Component({
  selector: 'app-badge-scrollbar',
  imports: [NgScrollbarModule, CardComponent],
  templateUrl: './badge-scrollbar.component.html',
  styleUrl: './badge-scrollbar.component.scss'
})

export class BadgeScrollbarComponent {

  public badgeScrollbar = badgeScrollbar;
  
}
