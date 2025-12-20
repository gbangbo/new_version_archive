import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';

import { selectState } from '../../../../../../../shared/data/form-layout';

@Component({
  selector: 'app-your-info',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module],
  templateUrl: './your-info.component.html',
  styleUrl: './your-info.component.scss'
})

export class YourInfoComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public validate: boolean = false;
  public selectState = selectState;

  public formValidation = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    agree: new FormControl('', Validators.required),
  });
  
  next() {
    this.validate = true;
    this.formValidation.markAllAsTouched();
    if (this.formValidation.valid) {
      this.active = this.active + 1;
      this.changeTab.emit(this.active);
    }
  }
  
}

