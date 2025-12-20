import { Component } from '@angular/core';

import { MyProfileComponent } from "../my-profile/my-profile.component";
import { friends, socialAppLeftPanelAccordion } from '../../../../shared/data/social-app';

@Component({
  selector: 'app-social-app-left-panel',
  imports: [MyProfileComponent],
  templateUrl: './social-app-left-panel.component.html',
  styleUrl: './social-app-left-panel.component.scss'
})

export class SocialAppLeftPanelComponent {

  public friends = friends;
  public socialAppLeftPanelAccordion = socialAppLeftPanelAccordion;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    if(this.socialAppLeftPanelAccordion) {
      this.socialAppLeftPanelAccordion.forEach((accordion) => {
        this.accordionOpen[accordion.id] = true;
      })
    }
  }

  toggleAccordion(index: number) {
    if (this.accordionOpen[index]) {
      this.accordionOpen[index] = false;
    } else {
      this.accordionOpen[index] = true;
    }
  }
  
}
