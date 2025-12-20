import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SvgIconComponent } from "../../../shared/components/ui/svg-icon/svg-icon.component";
import { ChatDetailsHeaderComponent } from "../widgets/chat-details-header/chat-details-header.component";
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { groupChats, randomChats } from '../../../shared/data/chat';
import { user } from '../../../shared/data/user';
import { GroupMembers, RecentChats } from '../../../shared/interface/chat';
import { OutsideDirective } from '../../../shared/directives/outside.directive';

@Component({
  selector: 'app-group-chat',
  imports: [CommonModule, ReactiveFormsModule, OutsideDirective,
            SidebarComponent, ChatDetailsHeaderComponent, SvgIconComponent],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.scss'
})

export class GroupChatComponent {
  
  public userDetails = user;
  public groupChats = groupChats;
  
  public currentUserChat: RecentChats;
  public inputMessage: string = '';
  public chatForm = new FormGroup({
    inputMessage: new FormControl('')
  })
  public dropdownOpen: boolean = false;

  @ViewChild('chat') private chatContainer: ElementRef;

  handleChat(chat: RecentChats) {
    this.currentUserChat = chat;
    this.scrollToBottom();
  }

  getUserDetails() {
    if (this.currentUserChat.group_members) {
      const random = this.currentUserChat.group_members[Math.floor(Math.random() * this.currentUserChat.group_members.length)];
      return random
    }
  }

  handleKeyPress(event: any) {
    if (event.key === 'Enter' && this.chatForm.value.inputMessage) {
      event.preventDefault();
      this.handleMessage();
    }
  }

  handleMessage() {
    if (this.chatForm.value.inputMessage) {
      if (!this.currentUserChat.chats) {
        this.currentUserChat.chats = [];
      }
      this.currentUserChat.chats?.push({
        chat: this.chatForm.value.inputMessage,
        is_reply: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      })
      
      this.scrollToBottom();
      setTimeout(() => {
        this.getReply()
      }, 500);
    }

    this.chatForm.controls['inputMessage'].setValue('');
    


    setTimeout(() => {
      if (this.currentUserChat.chats && this.currentUserChat.chats.length) {
        this.currentUserChat.last_message = this.currentUserChat.chats[this.currentUserChat.chats.length - 1]['chat']
        this.currentUserChat.message_time = this.currentUserChat.chats[this.currentUserChat.chats.length - 1]['time']
      }
      this.scrollToBottom()
    }, 500);
  }

  getReply() {
    const randomReply = randomChats[Math.floor(Math.random() * randomChats.length)];

    let randomUser;

    if (this.currentUserChat.group_members) {
      const user = this.currentUserChat.group_members[Math.floor(Math.random() * randomChats.length)];
      if (user) {
        randomUser = user.user_name;
      }
    }

    this.currentUserChat.chats?.push({
      chat: randomReply,
      is_reply: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      user_name: randomUser
    })
  }

  getUserProfile(members?: GroupMembers[], name?: string) {
    if (name && members) {
      const currentMember = members.find((user) => user.user_name === name);
      if (currentMember) {
        return currentMember?.user_profile
      }
    }
  }

  private scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTo({
          top: this.chatContainer.nativeElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 100);
  }

  toggleDropdown() {
    this.dropdownOpen =! this.dropdownOpen;
  }

  clickOutside(): void {
    this.dropdownOpen = false;
  }

}
