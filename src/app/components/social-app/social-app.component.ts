import { Component } from '@angular/core';

import { SocialAppProfileComponent } from "./widgets/social-app-profile/social-app-profile.component";
import { SocialAppTimelineComponent } from './widgets/social-app-timeline/social-app-timeline.component';
import { SocialAppAboutComponent } from "./widgets/social-app-about/social-app-about.component";
import { SocialAppFriendsComponent } from "./widgets/social-app-friends/social-app-friends.component";
import { SocialAppPhotosComponent } from "./widgets/social-app-photos/social-app-photos.component";

@Component({
  selector: 'app-social-app',
  imports: [SocialAppProfileComponent, SocialAppTimelineComponent, SocialAppAboutComponent, 
            SocialAppFriendsComponent, SocialAppPhotosComponent],
  templateUrl: './social-app.component.html',
  styleUrl: './social-app.component.scss'
})

export class SocialAppComponent {

  public activeTab: string;

  handleCurrentTab(value: string) {
    this.activeTab = value;
  }
  
}
