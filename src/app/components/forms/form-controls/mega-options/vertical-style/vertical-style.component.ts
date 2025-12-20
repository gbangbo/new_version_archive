import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { verticalStyle } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-vertical-style',
  imports: [CommonModule, BarRatingModule, CardComponent],
  templateUrl: './vertical-style.component.html',
  styleUrl: './vertical-style.component.scss'
})

export class VerticalStyleComponent {

  public verticalStyle = verticalStyle;

}
