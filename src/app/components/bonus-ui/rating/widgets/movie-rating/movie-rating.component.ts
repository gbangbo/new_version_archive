import { Component } from '@angular/core';
import { BarRatingModule } from "ngx-bar-rating";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-movie-rating',
  imports: [BarRatingModule, CardComponent],
  templateUrl: './movie-rating.component.html',
  styleUrl: './movie-rating.component.scss'
})

export class MovieRatingComponent {

  public movieRate = 2;
  
}
