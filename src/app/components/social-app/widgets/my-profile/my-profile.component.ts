import { Component } from '@angular/core';

import { myProfile } from '../../../../shared/data/social-app';
import { CounterComponent } from "../../../../shared/components/ui/counter/counter.component";
import { TooltipComponent } from "../../../../shared/components/ui/tooltip/tooltip.component";

@Component({
  selector: 'app-my-profile',
  imports: [CounterComponent, TooltipComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})

export class MyProfileComponent {

  public myProfile = myProfile;

}
