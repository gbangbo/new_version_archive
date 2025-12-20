import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { selectState, selectTheme } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-validation-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module, CardComponent],
  templateUrl: './validation-form.component.html',
  styleUrl: './validation-form.component.scss'
})

export class ValidationFormComponent {

  public selectTheme = selectTheme;
  public selectState = selectState;

  public validationForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    selectTheme: new FormControl('', Validators.required,),
    selectFile: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    condition: new FormControl('', Validators.required),
  })

  submitForm() {
    this.validationForm.markAllAsTouched();
    if (this.validationForm.valid) {
      window.location.reload();
    }
  }
  
}
