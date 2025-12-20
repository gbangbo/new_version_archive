import { Component } from '@angular/core';

import { SvgIconComponent } from "../../../ui/svg-icon/svg-icon.component";
import { notification } from '../../../../data/header';

@Component({
  selector: 'app-header-notification',
  imports: [SvgIconComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})

export class NotificationComponent {

  public notifications = notification;

  removeNotification(id: number) {
    const index = this.notifications.findIndex((notification) => notification.id === id);

    if(index !== -1) {
      this.notifications.splice(index, 1);
    }
  }
  
}
