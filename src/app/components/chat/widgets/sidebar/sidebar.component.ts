import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FeatherIconComponent } from "../../../../shared/components/ui/feather-icon/feather-icon.component";
import { SvgIconComponent } from '../../../../shared/components/ui/svg-icon/svg-icon.component';
import { chatTabs, contacts } from '../../../../shared/data/chat';
import { todoListColors } from '../../../../shared/data/project';
import { Contact, RecentChats } from '../../../../shared/interface/chat';
import { ChatService } from '../../../../shared/services/chat.service';
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, OutsideDirective, FeatherIconComponent, SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() currentUserChat = new EventEmitter<RecentChats>();

  @Input() recentChats: RecentChats[];
  @Input() groupChat: boolean = false;
  @Input() activeId: number = 2;

  public activeTab = 'chats';
  public activeChat = 2;
  public contacts = contacts;
  public colors = todoListColors;
  public chatTabs = chatTabs;
  public dropdownOpen: { [key: number]: boolean } = {};

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.currentUserChat.emit(this.getCurrentUserChat());
  }

  ngOnChanges() {
    if(this.activeId) {
      this.activeChat = this.activeId;
    }
  }

  handleTab(value: string) {
    this.activeTab = value;
  }

  handleChat(chat: RecentChats) {
    this.activeChat = chat.id;
    this.currentUserChat.emit(this.getCurrentUserChat());
  }

  getCurrentUserChat() {
    return this.recentChats.find(chat => chat.id == this.activeChat)
  }

  objectKeys(obj: Record<string, any>): string[] {
    return Object.keys(obj);
  }

  getContactGroup(): Record<string, Contact[]> {
    const groups: Record<string, Contact[]> = {};

    this.contacts.forEach((contact) => {
      const firstLetter = contact.user_name?.charAt(0).toUpperCase() || '#';

      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }

      groups[firstLetter].push(contact);
    });

    return Object.keys(groups)
    .sort((a, b) => {
      if (a === '#') return 1; // push '#' to the end
      if (b === '#') return -1;
      return a.localeCompare(b);
    })
    .reduce((sortedGroups: Record<string, Contact[]>, key) => {
      sortedGroups[key] = groups[key].sort((a, b) =>
        a.user_name.localeCompare(b.user_name)
      );
      return sortedGroups;
    }, {});
  }

  toggleDropdown(index: number) {
    if (this.dropdownOpen[index]) {
      this.dropdownOpen[index] = false;
    } else {
      Object.keys(this.dropdownOpen).forEach(key => {
        this.dropdownOpen[+key] = false;
      });
  
      this.dropdownOpen[index] = true;
    }
  }

  clickOutside(index: number): void {
    this.dropdownOpen[index] = false;
  }
  
}
