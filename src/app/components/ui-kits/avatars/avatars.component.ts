import { Component } from '@angular/core';

import { AvatarSizeComponent } from "./widgets/avatar-size/avatar-size.component";
import { AvatarStatusIndicatorComponent } from "./widgets/avatar-status-indicator/avatar-status-indicator.component";
import { AvatarShapeComponent } from "./widgets/avatar-shape/avatar-shape.component";
import { AvatarRatioComponent } from "./widgets/avatar-ratio/avatar-ratio.component";
import { AvatarGroupingComponent } from "./widgets/avatar-grouping/avatar-grouping.component";
import { AvatarBadgeComponent } from "./widgets/avatar-badge/avatar-badge.component";
import { AvatarLatterComponent } from "./widgets/avatar-latter/avatar-latter.component";
import { AvatarAnimatedComponent } from "./widgets/avatar-animated/avatar-animated.component";

@Component({
  selector: 'app-avatars',
  imports: [AvatarSizeComponent, AvatarStatusIndicatorComponent, AvatarShapeComponent,
            AvatarRatioComponent, AvatarGroupingComponent, AvatarBadgeComponent,
            AvatarLatterComponent, AvatarAnimatedComponent],
  templateUrl: './avatars.component.html',
  styleUrl: './avatars.component.scss'
})

export class AvatarsComponent {

}
