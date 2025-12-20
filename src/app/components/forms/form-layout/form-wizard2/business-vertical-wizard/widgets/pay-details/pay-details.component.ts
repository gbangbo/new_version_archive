import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Data, Select2Module } from 'ng-select2-component';

@Component({
  selector: 'app-pay-details',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module],
  templateUrl: './pay-details.component.html',
  styleUrl: './pay-details.component.scss'
})

export class PayDetailsComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public validate: boolean = false;
  public year: Select2Data = new Array();

  public formValidation = new FormGroup({
    cardHolder: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    expireDate: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
    agree: new FormControl('', Validators.required),
  });

  constructor() {
    for (let i = 2024; i <= 2035; i++) {
      this.year.push({ value: i, label: i.toString() })
    }
  }
  
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
