import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { cartInfo } from '../../../../../../../shared/data/form-layout';

@Component({
  selector: 'app-cart-info',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cart-info.component.html',
  styleUrl: './cart-info.component.scss'
})

export class CartInfoComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public cartInfo = cartInfo;
  public validate: boolean = false;
  public formValidation = new FormGroup({
    cardNumber: new FormControl('', Validators.required),
    expiration: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
    uploadDocument: new FormControl('', Validators.required),
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

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);
  }

}
