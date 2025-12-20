import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { UserActivityComponent } from "../widgets/user-activity/user-activity.component";
import { UserPersonalDetailsComponent } from "../widgets/user-personal-details/user-personal-details.component";
import { UserTaskComponent } from "../widgets/user-task/user-task.component";
import { UserNotificationComponent } from "../widgets/user-notification/user-notification.component";
import { UserSettingComponent } from "../widgets/user-setting/user-setting.component";
import { userDetailsTab, users } from '../../../shared/data/user';
import { Users } from '../../../shared/interface/user';

@Component({
  selector: 'app-user-profile',
  imports: [UserPersonalDetailsComponent, CardComponent, UserActivityComponent,
            UserTaskComponent, UserNotificationComponent,  UserSettingComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {

  public currentUserId: number;
  public currentUser: Users;
  public users = users;
  public userDetailsTab = userDetailsTab;
  public activeTab: string = 'activity';
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.currentUserId = id;
        const user = this.users.find(user => user.id === this.currentUserId);
        if(user) {
          this.currentUser = user;
        }
      }
    });
  }

  handleTab(value: string) {
    this.activeTab = value;
  }

}
