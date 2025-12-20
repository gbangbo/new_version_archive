import { Component } from '@angular/core';

import { HoverIconCardComponent } from "./widgets/hover-icon-card/hover-icon-card.component";
import { ImageCardComponent } from "./widgets/image-card/image-card.component";
import { OverlayCardComponent } from "./widgets/overlay-card/overlay-card.component";
import { BorderLeftCardComponent } from "./widgets/border-left-card/border-left-card.component";
import { BorderRightCardComponent } from "./widgets/border-right-card/border-right-card.component";
import { BorderTopCardComponent } from "./widgets/border-top-card/border-top-card.component";
import { BorderBottomCardComponent } from "./widgets/border-bottom-card/border-bottom-card.component";
import { BorderPrimaryStateComponent } from "./widgets/border-primary-state/border-primary-state.component";
import { BorderWarningStateComponent } from "./widgets/border-warning-state/border-warning-state.component";
import { BorderSecondaryStateComponent } from "./widgets/border-secondary-state/border-secondary-state.component";
import { AbsoluteCardComponent } from "./widgets/absolute-card/absolute-card.component";
import { absoluteCards } from '../../../shared/data/bonus-ui/creative-cards';

@Component({
  selector: 'app-creative-card',
  imports: [HoverIconCardComponent, ImageCardComponent, OverlayCardComponent,
            BorderLeftCardComponent, BorderRightCardComponent, BorderTopCardComponent,
            BorderBottomCardComponent, BorderPrimaryStateComponent, BorderWarningStateComponent,
            BorderSecondaryStateComponent, AbsoluteCardComponent],
  templateUrl: './creative-card.component.html',
  styleUrl: './creative-card.component.scss'
})

export class CreativeCardComponent {

  public absoluteCards = absoluteCards;

}
