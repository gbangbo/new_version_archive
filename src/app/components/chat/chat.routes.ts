import { Routes } from "@angular/router";

import { PrivateChatComponent } from "./private-chat/private-chat.component";
import { GroupChatComponent } from "./group-chat/group-chat.component";

export const chat: Routes = [
  {
    path: 'private-chat',
    component: PrivateChatComponent,
    data: {
      title: 'Private Chat',
      breadcrumb: 'Private Chat'
    }
  },
  {
    path: 'group-chat',
    component: GroupChatComponent,
    data: {
      title: 'Group Chat',
      breadcrumb: 'Group Chat'
    }
  }
]
