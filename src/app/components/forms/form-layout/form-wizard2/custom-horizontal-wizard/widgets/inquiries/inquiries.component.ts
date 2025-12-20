import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { inquiries } from '../../../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-inquiries',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './inquiries.component.html',
  styleUrl: './inquiries.component.scss'
})

export class InquiriesComponent {
  
  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public inquiries = inquiries;
  public validate: boolean = false;

  public formValidation = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contactNumber: new FormControl('', Validators.required),
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
