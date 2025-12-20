import { Component } from '@angular/core';
import { BarRatingModule } from "ngx-bar-rating";

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-effect-rating',
  imports: [BarRatingModule, CardComponent],
  templateUrl: './effect-rating.component.html',
  styleUrl: './effect-rating.component.scss'
})

export class EffectRatingComponent {

  public rate = 1;

}
