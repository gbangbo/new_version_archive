import { Component } from '@angular/core';
import { BarRatingModule } from "ngx-bar-rating";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-square-rating',
  imports: [BarRatingModule, CardComponent],
  templateUrl: './square-rating.component.html',
  styleUrl: './square-rating.component.scss'
})

export class SquareRatingComponent {

  public squareRate = 1;

}
