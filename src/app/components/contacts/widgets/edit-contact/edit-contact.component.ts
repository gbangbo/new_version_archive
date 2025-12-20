import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { Select2Module } from 'ng-select2-component';

import { contactTypes, urlTypes } from '../../../../shared/data/contacts';
import { Contact } from '../../../../shared/interface/contacts';

@Component({
  selector: 'app-edit-contact',
  imports: [CommonModule, OwlDateTimeModule, OwlNativeDateTimeModule, 
            ReactiveFormsModule, FormsModule, Select2Module],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent {

  @Output() edit = new EventEmitter();

  @Input() activeContact: Contact;

  public selectedDate: Date;
  public contactTypes = contactTypes;
  public urlTypes = urlTypes;
  public moreInformation: boolean = false;

  ngOnInit() {
    this.setDate();
  }

  ngOnChanges(change: SimpleChanges) {
    if(change['activeContact']) {
      this.setDate()
    }
  }

  save() {
    this.moreInformation = false;
    this.edit.emit(false);
  }

  setDate() {
    if(this.activeContact && this.activeContact.DOB) {
      const date = new Date(this.activeContact.DOB);
      this.selectedDate = date
    }
  }

  editMoreInformation() {
    this.moreInformation = true;
  }
  
}
