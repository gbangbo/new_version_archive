import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SvgIconComponent } from "../../shared/components/ui/svg-icon/svg-icon.component";
import { MailDetailsComponent } from "./widgets/mail-details/mail-details.component";
import { MailHeaderComponent } from "./widgets/mail-header/mail-header.component";
import { SidebarComponent } from "./widgets/sidebar/sidebar.component";
import { emails, emailSidebar } from '../../shared/data/email';
import { Emails } from '../../shared/interface/email';
@Component({
  selector: 'app-mail-box',
  imports: [CommonModule, SidebarComponent, MailHeaderComponent, SvgIconComponent, MailDetailsComponent],
  templateUrl: './mail-box.component.html',
  styleUrl: './mail-box.component.scss'
})

export class MailBoxComponent {

  public emails = emails;
  public emailSidebar = emailSidebar;
  public emailType: string;
  public currentTab: string;
  public isOpenMail: boolean = false;
  public currentMailDetails: Emails;

  constructor() {
    this.getTotalEmails();
  }

  handleEmailType(value: string) {
    this.emailType = value;
  }

  handleCurrentTab(value: string) {
    this.currentTab = value;
  }

  getTotalEmails() {
    this.emailSidebar.forEach((item) => {
      if(item.value == 'inbox') {
        item.tag = this.emails.filter(email => !email.is_trash).length;
      } else if(item.value == 'starred') {
        item.tag = this.emails.filter(email => email.is_favorite && !email.is_trash).length;
      } else if(item.value == 'draft') {
        item.tag = this.emails.filter(email => email.is_draft && !email.is_trash).length;
      } else if(item.value == 'trash') {
        item.tag = this.emails.filter(email => email.is_trash).length;
      }
    })
  }

  getFilteredEmails() {
    if(this.currentTab == 'inbox') {
      return this.emails.filter(email => !email.is_trash && email.email_type == this.emailType)
    } else if(this.currentTab == 'sent') {
      return this.emails.filter(email => email.is_send && !email.is_trash && email.email_type == this.emailType);
    } else if(this.currentTab == 'starred') {
      return this.emails.filter(email => email.is_favorite && !email.is_trash && email.email_type == this.emailType);
    } else if(this.currentTab == 'draft') {
      return this.emails.filter(email => email.is_draft && !email.is_trash && email.email_type == this.emailType);
    } else if(this.currentTab == 'trash') {
      return this.emails.filter(email => email.is_trash && email.email_type == this.emailType);
    }
  }

  getUserText(userName: string): string {
    let names = userName.split(' ');
    return names.map(name => name[0]).join('');
  }

  getTextColor(name: string) {
    let firstLetter = name[0];

    if(firstLetter >= 'A' && firstLetter <= 'M') {
      return 'primary'
    } else {
      return 'success'
    }
  }

  addToFavorite(email: Emails) {
    email.is_favorite =! email.is_favorite;
    this.getTotalEmails()
  }

  deleteMail(email: Emails) {
    if(!email.is_trash) {
      email.is_trash = true;
    } else {
      this.emails = this.emails.filter(emails => emails.id !== email.id);
    }
    this.getTotalEmails()
  }

  openEmail(email: Emails) {
    this.isOpenMail = true;
    this.currentMailDetails = email;
  }

  handleMailDetails(value: boolean) {
    this.isOpenMail = value;
  }
  
}
