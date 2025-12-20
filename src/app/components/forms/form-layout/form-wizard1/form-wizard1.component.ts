import { Component } from '@angular/core';

import { NumberingWizardComponent } from "./numbering-wizard/numbering-wizard.component";
import { StudentValidationFormComponent } from "./student-validation-form/student-validation-form.component";
import { VerticalValidationWizardComponent } from "./vertical-validation-wizard/vertical-validation-wizard.component";
import { ShippingFormComponent } from "./shipping-form/shipping-form.component";

@Component({
  selector: 'app-form-wizard1',
  imports: [NumberingWizardComponent, StudentValidationFormComponent, 
            VerticalValidationWizardComponent, ShippingFormComponent],
  templateUrl: './form-wizard1.component.html',
  styleUrl: './form-wizard1.component.scss'
})

export class FormWizard1Component {

}
