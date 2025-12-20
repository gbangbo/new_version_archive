import { Component } from '@angular/core';

import { CardComponent } from "../../../../shared/components/ui/card/card.component";
import { notifications } from '../../../../shared/data/user';
import { Notification } from '../../../../shared/interface/user';

@Component({
  selector: 'app-user-notification',
  imports: [CardComponent],
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.scss'
})

export class UserNotificationComponent {

  public notifications = notifications;

  objectKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }

  getNotificationGroup(): Record<string, Notification[]> {
    const groups: Record<string, Notification[]> = {};

    this.notifications.forEach((notification) => {

      if (!groups[notification.date]) {
        groups[notification.date] = [];
      }

      groups[notification.date].push(notification);
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
