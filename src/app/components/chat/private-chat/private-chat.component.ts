import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SvgIconComponent } from "../../../shared/components/ui/svg-icon/svg-icon.component";
import { ChatDetailsHeaderComponent } from "../widgets/chat-details-header/chat-details-header.component";
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { randomChats, recentChats } from '../../../shared/data/chat';
import { user } from '../../../shared/data/user';
import { OutsideDirective } from '../../../shared/directives/outside.directive';
import { RecentChats } from '../../../shared/interface/chat';

@Component({
  selector: 'app-private-chat',
  imports: [CommonModule, ReactiveFormsModule, OutsideDirective,
            SidebarComponent, ChatDetailsHeaderComponent, SvgIconComponent],
  templateUrl: './private-chat.component.html',
  styleUrl: './private-chat.component.scss'
})
export class PrivateChatComponent {
  
  public userDetails = user;
  public recentChats = recentChats;
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

  handleKeyPress(event: any) {
    if (event.key === 'Enter' && this.chatForm.value.inputMessage) {
      event.preventDefault();
      this.handleMessage();
    }
  }

  handleMessage() {
    if(this.chatForm.value.inputMessage) {
      if(!this.currentUserChat.chats) {
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
  
      setTimeout(() => {
        if(this.currentUserChat.chats && this.currentUserChat.chats.length) {
          this.currentUserChat.last_message = this.currentUserChat.chats[this.currentUserChat.chats.length - 1]['chat']
          this.currentUserChat.message_time = this.currentUserChat.chats[this.currentUserChat.chats.length - 1]['time']
          this.currentUserChat.user_status = 'Online';
        }
        this.scrollToBottom();
      }, 500);
    }

    this.chatForm.controls['inputMessage'].setValue('');
  }

  getReply() {
    const randomReply = randomChats[Math.floor(Math.random() * randomChats.length)];

    this.currentUserChat.chats?.push({
      chat: randomReply,
      is_reply: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
    })
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

