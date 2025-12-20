import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { businessSettings } from '../../../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-business-setting',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './business-setting.component.html',
  styleUrl: './business-setting.component.scss'
})

export class BusinessSettingComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public businessSettings = businessSettings;
  public validate: boolean = false;

  public formValidation = new FormGroup({
    account_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
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
