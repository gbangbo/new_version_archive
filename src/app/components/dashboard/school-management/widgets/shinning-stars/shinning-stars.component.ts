import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { shiningStar } from '../../../../../shared/data/dashboard/school-management';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-shinning-stars',
  imports: [CommonModule, CardComponent],
  templateUrl: './shinning-stars.component.html',
  styleUrl: './shinning-stars.component.scss'
})

export class ShinningStarsComponent {

  public shiningStar = shiningStar;
  public cardToggleOption = cardToggleOptions3;

}
