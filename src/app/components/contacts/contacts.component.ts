import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ContactHistoryComponent } from "./widgets/contact-history/contact-history.component";
import { EditContactComponent } from "./widgets/edit-contact/edit-contact.component";
import { PrintContactModalComponent } from './widgets/print-contact-modal/print-contact-modal.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { Contact, ContactSidebarList } from '../../shared/interface/contacts';
import { ContactService } from '../../shared/services/contact.service';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, SidebarComponent, EditContactComponent, 
            ContactHistoryComponent, PrintContactModalComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent {

  public edit: boolean = false;
  public history: boolean = false;
  public modalOpen: boolean = false;

  constructor(public contactService: ContactService) {}

  handleCurrentTab(tab: ContactSidebarList) {
    this.contactService.handleCurrentTab(tab);
  }

  filteredContact() {
    this.contactService.filteredContact();
  }

  handleContact(contact: Contact) {
    this.contactService.activeContact = contact;
  }

  editContact() {
    this.edit = true;
  }

  handleEdit(value: boolean) {
    this.edit = value;
  }
  
  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact);
  }

  showHistory() {
    this.history = true;
  }

  handleHistory(value: boolean) {
    this.history = value;
  }

  printContact() {
    this.modalOpen = true;
  }

  handleOpenModal(value: boolean) {
    this.modalOpen = value;
  }
  
}
