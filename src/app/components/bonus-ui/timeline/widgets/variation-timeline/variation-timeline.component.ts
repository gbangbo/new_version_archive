import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { variationTimeline } from '../../../../../shared/data/bonus-ui/timeline';

@Component({
  selector: 'app-variation-timeline',
  imports: [CardComponent],
  templateUrl: './variation-timeline.component.html',
  styleUrl: './variation-timeline.component.scss'
})

export class VariationTimelineComponent {

  public variationTimeline = variationTimeline;

}
