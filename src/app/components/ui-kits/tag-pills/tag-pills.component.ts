import { Component } from '@angular/core';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { VariationBadgeComponent } from "./widgets/variation-badge/variation-badge.component";
import { colorsTwo } from '../../../shared/data/ui-kits/helper-classes';
import { badgeIcons } from '../../../shared/data/ui-kits/badge';
import { BadgeHeadingComponent } from "./widgets/badge-heading/badge-heading.component";
import { PositionedBadgeComponent } from "./widgets/positioned-badge/positioned-badge.component";
import { ButtonBadgeComponent } from "./widgets/button-badge/button-badge.component";
import { ImageBadgeComponent } from "./widgets/image-badge/image-badge.component";
import { CloseBadgeComponent } from "./widgets/close-badge/close-badge.component";
import { ImageCloseBadgeComponent } from "./widgets/image-close-badge/image-close-badge.component";

@Component({
  selector: 'app-tag-pills',
  imports: [CardComponent, VariationBadgeComponent, BadgeHeadingComponent,
            PositionedBadgeComponent, ButtonBadgeComponent, ImageBadgeComponent,
            CloseBadgeComponent, ImageCloseBadgeComponent],
  templateUrl: './tag-pills.component.html',
  styleUrl: './tag-pills.component.scss'
})

export class TagPillsComponent {

  public badgeColors = colorsTwo;
  public badgeIcons = badgeIcons;

}
