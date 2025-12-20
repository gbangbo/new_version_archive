import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';

import { contactDetails } from '../../../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})

export class ContactDetailsComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public contactDetails = contactDetails;
  public validate: boolean = false;

  public formValidation = new FormGroup({
    organizationName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', Validators.required),
  });
  
  next() {
    this.validate = true;
    this.formValidation.markAllAsTouched();
    if (this.formValidation.valid) {
      this.active = this.active + 1;
      this.changeTab.emit(this.active);
    }
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);
  }

}
