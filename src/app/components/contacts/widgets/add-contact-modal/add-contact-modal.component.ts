import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';

import { contactTypes } from '../../../../shared/data/contacts';
import { ContactService } from '../../../../shared/services/contact.service';
import { OutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-add-contact-modal',
  imports: [CommonModule, ReactiveFormsModule, Select2Module, OutsideDirective],
  templateUrl: './add-contact-modal.component.html',
  styleUrl: './add-contact-modal.component.scss'
})

export class AddContactModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public contactTypes = contactTypes;

  public contactForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact_number: new FormControl('', [Validators.required, 
                    Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
                    Validators.minLength(10),
                    Validators.maxLength(10)]),
    contactType: new FormControl('', [Validators.required]),
  })

  constructor(private contactService: ContactService) { }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  saveContact() {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.valid) {
      this.contactService.addContact(this.contactForm.value);
      this.closeModal();
      this.contactForm.reset();
    }

  }

  closeModal() {
    this.modalOpen.emit(false)
  }
}
