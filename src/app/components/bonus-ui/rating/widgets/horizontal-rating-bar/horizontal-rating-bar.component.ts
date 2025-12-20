import { Component } from '@angular/core';
import { BarRatingModule } from "ngx-bar-rating";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-horizontal-rating-bar',
  imports: [BarRatingModule, CardComponent],
  templateUrl: './horizontal-rating-bar.component.html',
  styleUrl: './horizontal-rating-bar.component.scss'
})

export class HorizontalRatingBarComponent {

  public rate = 7;

}
