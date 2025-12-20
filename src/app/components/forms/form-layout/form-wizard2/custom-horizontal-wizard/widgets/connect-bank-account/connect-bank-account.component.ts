import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { bankAccount } from '../../../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-connect-bank-account',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './connect-bank-account.component.html',
  styleUrl: './connect-bank-account.component.scss'
})

export class ConnectBankAccountComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public bankAccount = bankAccount;
  public validate: boolean = false;
  
  public formValidation = new FormGroup({
    aadhar_number: new FormControl('', Validators.required),
    pan_number: new FormControl('', Validators.required),
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
