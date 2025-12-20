import { Component } from '@angular/core';
import { BarRatingModule } from "ngx-bar-rating";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-vertical-rating-bar',
  imports: [BarRatingModule, CardComponent],
  templateUrl: './vertical-rating-bar.component.html',
  styleUrl: './vertical-rating-bar.component.scss'
})

export class VerticalRatingBarComponent {
  
  public rate = 1;

}
