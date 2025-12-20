import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { colorsTwo } from '../../../../../shared/data/ui-kits/helper-classes';
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";

@Component({
  selector: 'app-close-badge',
  imports: [TitleCasePipe, CardComponent, FeatherIconComponent],
  templateUrl: './close-badge.component.html',
  styleUrl: './close-badge.component.scss'
})

export class CloseBadgeComponent {

  public colors = colorsTwo;

}
