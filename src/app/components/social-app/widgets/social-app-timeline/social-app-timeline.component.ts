import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { SocialAppLeftPanelComponent } from "../social-app-left-panel/social-app-left-panel.component";
import { SocialAppRightPanelComponent } from '../social-app-right-panel/social-app-right-panel.component';
import { userPost } from '../../../../shared/data/social-app';

@Component({
  selector: 'app-social-app-timeline',
  imports: [CommonModule, SocialAppLeftPanelComponent, SocialAppRightPanelComponent, FeatherIconComponent],
  templateUrl: './social-app-timeline.component.html',
  styleUrl: './social-app-timeline.component.scss'
})

export class SocialAppTimelineComponent {

  public userPost = userPost;

}
