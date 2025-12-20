import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { friends, myProfile, socialAppRightPanelAccordion } from '../../../../shared/data/social-app';
import { TooltipComponent } from "../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-social-app-right-panel',
  imports: [CommonModule, TooltipComponent],
  templateUrl: './social-app-right-panel.component.html',
  styleUrl: './social-app-right-panel.component.scss'
})

export class SocialAppRightPanelComponent {

  public myProfile = myProfile;
  public friends = friends;
  public socialAppRightPanelAccordion = socialAppRightPanelAccordion;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    if (this.socialAppRightPanelAccordion) {
      this.socialAppRightPanelAccordion.forEach((accordion) => {
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
