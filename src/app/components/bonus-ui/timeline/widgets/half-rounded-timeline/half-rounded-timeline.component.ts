import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { halfRoundedTimeline } from '../../../../../shared/data/bonus-ui/timeline';

@Component({
  selector: 'app-half-rounded-timeline',
  imports: [CardComponent],
  templateUrl: './half-rounded-timeline.component.html',
  styleUrl: './half-rounded-timeline.component.scss'
})

export class HalfRoundedTimelineComponent {

  public halfRoundedTimeline = halfRoundedTimeline;

}
