import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { horizontalTimeline } from '../../../../../shared/data/bonus-ui/timeline';

@Component({
  selector: 'app-horizontal-timeline',
  imports: [CommonModule, CardComponent],
  templateUrl: './horizontal-timeline.component.html',
  styleUrl: './horizontal-timeline.component.scss'
})

export class HorizontalTimelineComponent {

  public horizontalTimeline = horizontalTimeline;

}
