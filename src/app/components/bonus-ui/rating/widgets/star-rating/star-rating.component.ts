import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule, BarRatingModule, CardComponent],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})

export class StarRatingComponent {

  public rating = 2;

}
