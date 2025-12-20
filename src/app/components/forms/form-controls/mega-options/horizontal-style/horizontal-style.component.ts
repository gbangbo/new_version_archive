import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { horizontalStyle } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-horizontal-style',
  imports: [CommonModule, BarRatingModule, CardComponent],
  templateUrl: './horizontal-style.component.html',
  styleUrl: './horizontal-style.component.scss'
})

export class HorizontalStyleComponent {

  public horizontalStyle = horizontalStyle;

}
