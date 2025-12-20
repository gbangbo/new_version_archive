import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { animatedTimeline } from '../../../../../shared/data/bonus-ui/timeline';

@Component({
  selector: 'app-animated-timeline',
  imports: [CommonModule, CardComponent],
  templateUrl: './animated-timeline.component.html',
  styleUrl: './animated-timeline.component.scss'
})

export class AnimatedTimelineComponent {

  public animatedTimeline = animatedTimeline;

}
