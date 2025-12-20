import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { OutsideDirective } from '../../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-cuba-signup-modal',
  imports: [CommonModule, ReactiveFormsModule, OutsideDirective],
  templateUrl: './cuba-signup-modal.component.html',
  styleUrl: './cuba-signup-modal.component.scss'
})

export class CubaSignupModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    policy: new FormControl(true, [Validators.required]),
  })

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  handleChange(event: any) {
    const value = event.target.checked;

    this.signUpForm.get('policy')?.setValue(value);
  }

  submit() {
    this.signUpForm.markAllAsTouched();

    if(this.signUpForm.valid) {
      this.modalOpen.emit(false);
    }
  }

  closeModal(){
    this.modalOpen.emit(false);
  }
  
}
