import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { hoveringTimeline } from '../../../../../shared/data/bonus-ui/timeline';

@Component({
  selector: 'app-hovering-timeline',
  imports: [CardComponent],
  templateUrl: './hovering-timeline.component.html',
  styleUrl: './hovering-timeline.component.scss'
})

export class HoveringTimelineComponent {

  public hoveringTimeline = hoveringTimeline;

}
