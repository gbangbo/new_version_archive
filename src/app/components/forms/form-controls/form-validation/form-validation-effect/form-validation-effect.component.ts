import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-form-validation-effect',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CardComponent],
  templateUrl: './form-validation-effect.component.html',
  styleUrl: './form-validation-effect.component.scss'
})

export class FormValidationEffectComponent {

  public formValidation = new FormGroup({
    fullName: new FormControl('', Validators.required),
    gmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  })

  submitForm() {
    this.formValidation.markAllAsTouched();
    if (this.formValidation.valid) {
      window.location.reload();
    }
  }

}
