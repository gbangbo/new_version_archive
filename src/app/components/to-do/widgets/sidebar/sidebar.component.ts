import { Component } from '@angular/core';

import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { sidebar } from '../../../../shared/data/todo';
import { user } from '../../../../shared/data/user';

@Component({
  selector: 'app-sidebar',
  imports: [FeatherIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  public sidebar = sidebar;
  public userDetails = user;
  public sidebarOpen: boolean = false;

  toggleSidebar() {
    this.sidebarOpen =! this.sidebarOpen;
  }
  
}
