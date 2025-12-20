import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-form-password-validation',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CardComponent],
  templateUrl: './form-password-validation.component.html',
  styleUrl: './form-password-validation.component.scss'
})

export class FormPasswordValidationComponent {

  public strengthPercent = 0;
  public strengthClass = 'bg-danger';

  public passwordValid = {
    lowerUpper: false,
    number: false,
    special: false,
    length: false
  };

  public formValidation = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required,),
  })

  submitForm() {
    this.formValidation.markAllAsTouched();
    if (this.formValidation.valid) {
      window.location.reload();
    }
  }

  get password() {
    return this.formValidation.get('password');
  }

  checkStrength() {
    const password = this.password?.value || '';
    let score = 0;

    this.passwordValid.lowerUpper = /[a-z]/.test(password) && /[A-Z]/.test(password);
    this.passwordValid.number = /\d/.test(password);
    this.passwordValid.special = /[@$!%*?&]/.test(password);
    this.passwordValid.length = password.length >= 8;

    if (this.passwordValid.lowerUpper) score++;
    if (this.passwordValid.number) score++;
    if (this.passwordValid.special) score++;
    if (this.passwordValid.length) score++;

    this.strengthPercent = (score / 4) * 100;

    switch (score) {
      case 0:
      case 1:
        this.strengthClass = 'bg-danger';
        break;
      case 2:
        this.strengthClass = 'bg-danger';
        break;
      case 3:
        this.strengthClass = 'bg-warning';
        break;
      case 4:
        this.strengthClass = 'bg-success';
        break;
    }
  }
}
