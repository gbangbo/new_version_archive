import { Component } from '@angular/core';

import { CardComponent } from "../../shared/components/ui/card/card.component";
import { TableComponent } from "../../shared/components/ui/table/table.component";
import { subscribedUser } from '../../shared/data/subscribed-user';
import { TableConfigs } from '../../shared/interface/common';
import { SubscribedUser } from '../../shared/interface/subscribed-user';

@Component({
  selector: 'app-subscribed-user',
  imports: [TableComponent, CardComponent],
  templateUrl: './subscribed-user.component.html',
  styleUrl: './subscribed-user.component.scss'
})

export class SubscribedUserComponent {

  public subscribedUser = subscribedUser;
  
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Email ID', field_value: 'email_id', sort: true },
      { title: 'Subscription Date', field_value: 'subscription_date', sort: true, },
      { title: 'Status', field_value: 'status', sort: true, },
    ],
    row_action: [
      { label: "Refresh", action_to_perform: "refresh", icon: "arrows-rotate" },
    ],
    data: [] as SubscribedUser[]
  };

  ngOnInit() {
    this.tableConfig.data = subscribedUser.map((user: SubscribedUser) => {
      const formattedUsers = { ...user };
      formattedUsers.status = `<span class="badge badge-light-${user.class}">${user.status}</span>`;
      return formattedUsers;
    });
  }

}
