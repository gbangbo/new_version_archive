import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { selectState } from '../../../../../shared/data/form-control';

@Component({
  selector: 'app-tooltip-form-validation',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Select2Module, CardComponent],
  templateUrl: './tooltip-form-validation.component.html',
  styleUrl: './tooltip-form-validation.component.scss'
})

export class TooltipFormValidationComponent {

  public selectState = selectState;
  public tooltipForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required, ),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required)
  })

  submitForm() {
    this.tooltipForm.markAllAsTouched();
    if (this.tooltipForm.valid) {
      window.location.reload();
    }
  }
}
