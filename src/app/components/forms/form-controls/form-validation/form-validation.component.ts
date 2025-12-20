import { Component } from '@angular/core';

import { TooltipFormValidationComponent } from "./tooltip-form-validation/tooltip-form-validation.component";
import { BrowserDefaultComponent } from "./browser-default/browser-default.component";
import { ValidationFormComponent } from "./validation-form/validation-form.component";
import { FormValidationEffectComponent } from "./form-validation-effect/form-validation-effect.component";
import { FormPasswordValidationComponent } from "./form-password-validation/form-password-validation.component";

@Component({
  selector: 'app-form-validation',
  imports: [TooltipFormValidationComponent, BrowserDefaultComponent, ValidationFormComponent, 
            FormValidationEffectComponent, FormPasswordValidationComponent],
  templateUrl: './form-validation.component.html',
  styleUrl: './form-validation.component.scss'
})

export class FormValidationComponent {

}
