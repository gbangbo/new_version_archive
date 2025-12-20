import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { basicTimeline } from '../../../../../shared/data/bonus-ui/timeline';

@Component({
  selector: 'app-basic-timeline',
  imports: [CardComponent],
  templateUrl: './basic-timeline.component.html',
  styleUrl: './basic-timeline.component.scss'
})

export class BasicTimelineComponent {
  
  public basicTimeline  = basicTimeline;

}
