import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { SocialAppLeftPanelComponent } from "../social-app-left-panel/social-app-left-panel.component";
import { SocialAppRightPanelComponent } from "../social-app-right-panel/social-app-right-panel.component";
import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { friends, myProfile } from '../../../../shared/data/social-app';

@Component({
  selector: 'app-social-app-about',
  imports: [SlicePipe, SocialAppLeftPanelComponent, SocialAppRightPanelComponent, CardComponent, FeatherIconComponent],
  templateUrl: './social-app-about.component.html',
  styleUrl: './social-app-about.component.scss'
})

export class SocialAppAboutComponent {

  public friends = friends;
  public myProfile = myProfile;

  objectKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }

  getActivityGroup(): Record<string, any> {
    const groups: Record<string, any> = {};

    this.myProfile.activity_log.forEach((activity) => {

      if (!groups[activity.date]) {
        groups[activity.date] = [];
      }

      groups[activity.date].push(activity);
    });

    return groups;
  }

  getDate(date: string) {
    let todayDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);

    let yesterdayDate = newDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    if(date == todayDate) {
      return 'Today';
    } else if(date == yesterdayDate) {
      return 'Yesterday';
    } else {
      return date
    }
  }
  
}
