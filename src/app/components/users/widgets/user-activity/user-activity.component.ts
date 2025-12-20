import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { TooltipComponent } from "../../../../shared/components/ui/tooltip/tooltip.component";
import { activityColors, userRecentActivity } from '../../../../shared/data/user';
import { ChatService } from '../../../../shared/services/chat.service';

@Component({
  selector: 'app-user-activity',
  imports: [CardComponent, TooltipComponent],
  templateUrl: './user-activity.component.html',
  styleUrl: './user-activity.component.scss'
})

export class UserActivityComponent {

  public userRecentActivity = userRecentActivity;
  public activityColors = activityColors;
  
  constructor(public chatService: ChatService) {}

  getColor(i: number) {
    return this.activityColors[i % this.activityColors.length];
  }
  
}
