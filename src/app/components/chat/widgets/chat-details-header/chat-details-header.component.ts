import { Component, Input } from '@angular/core';

import { SvgIconComponent } from "../../../../shared/components/ui/svg-icon/svg-icon.component";
import { ChatService } from '../../../../shared/services/chat.service';
import { RecentChats } from '../../../../shared/interface/chat';
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-chat-details-header',
  imports: [OutsideDirective, SvgIconComponent],
  templateUrl: './chat-details-header.component.html',
  styleUrl: './chat-details-header.component.scss'
})

export class ChatDetailsHeaderComponent {

  @Input() currentUserChat: RecentChats;
  @Input() groupChat: boolean = false;

  public dropdownOpen: boolean = false;

  constructor(public chatService: ChatService) {}

  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }

}
