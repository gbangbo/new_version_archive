import { Component } from '@angular/core';

import { AnimatedTimelineComponent } from "./widgets/animated-timeline/animated-timeline.component";
import { BasicTimelineComponent } from "./widgets/basic-timeline/basic-timeline.component";
import { HoveringTimelineComponent } from "./widgets/hovering-timeline/hovering-timeline.component";
import { VariationTimelineComponent } from "./widgets/variation-timeline/variation-timeline.component";
import { HorizontalTimelineComponent } from "./widgets/horizontal-timeline/horizontal-timeline.component";
import { HalfRoundedTimelineComponent } from "./widgets/half-rounded-timeline/half-rounded-timeline.component";

@Component({
  selector: 'app-timeline',
  imports: [AnimatedTimelineComponent, BasicTimelineComponent, HoveringTimelineComponent,
            VariationTimelineComponent, HorizontalTimelineComponent, HalfRoundedTimelineComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})

export class TimelineComponent {

}
