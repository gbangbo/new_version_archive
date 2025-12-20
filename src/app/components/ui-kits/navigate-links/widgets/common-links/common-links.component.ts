import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { commonOpacity, defaultLink, underlineOpacity } from '../../../../../shared/data/ui-kits/navigate-links';

@Component({
  selector: 'app-common-links',
  imports: [CardComponent],
  templateUrl: './common-links.component.html',
  styleUrl: './common-links.component.scss'
})

export class CommonLinksComponent {

  public commonOpacity = commonOpacity;
  public underlineOpacity = underlineOpacity;
  public defaultLink = defaultLink;

}
