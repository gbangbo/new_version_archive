import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

import { contacts } from "../data/contacts";
import { Contact, ContactSidebarList } from "../interface/contacts";

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  public contacts: Contact[] = contacts;
  public currentTab: ContactSidebarList;
  public activeContact: Contact;

  handleCurrentTab(tab: ContactSidebarList) {
    
    this.currentTab = tab;

    const currentTabContact = this.filteredContact();

    if (currentTabContact) {
      this.activeContact = currentTabContact[0];
    }
  }

  filteredContact() {
    if (this.currentTab.value) {
      return this.contacts.filter(contact => contact.category == this.currentTab.value);
    }
  }

  handleContact(contact: Contact) {
    this.activeContact = contact;
  }

  addContact(contact: any) {
    let newContact = {
      id: Math.floor(Math.random() * 999) + 1,
      first_name: contact.first_name,
      last_name: contact.last_name,
      profile: 'assets/images/user/user.png',
      gender: 'Male',
      DOB: '10 Aug 1995',
      personality: 'Cool',
      city: 'Surat',
      contact_number: contact.contact_number,
      email: contact.email,
      website: 'www.ivan.com',
      interest: 'Dancer',
      category: 'personal',
      contact_type: contact.contact_type,
    }

    if(this.filteredContact() && this.filteredContact()?.length == 0) {
      this.activeContact = newContact
    }

    this.contacts.push(newContact)

  }

  deleteContact(contact: Contact) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This contact will be deleted from your personal contacts and from the chat list too.',
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      showCancelButton: true,
      cancelButtonText: 'No, keep it',
      cancelButtonColor: '#898989',
    }).then((result) => {
      if (result.isConfirmed) {
        const deletedIndex = this.filteredContact()?.findIndex(c => c.id === contact.id);
        this.contacts = this.contacts.filter(c => c.id !== contact.id);

        const updatedContacts = this.filteredContact();
        if (updatedContacts && updatedContacts.length > 0) {
          if (deletedIndex && deletedIndex >= updatedContacts.length) {
            this.activeContact = updatedContacts[0];
          } else {
            if (deletedIndex) {
              this.activeContact = updatedContacts[deletedIndex];
            } else {
              this.activeContact = updatedContacts[0]
            }
          }
        }
      }
    })
  }
}