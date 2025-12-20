import { Component } from '@angular/core';

import { BusinessVerticalWizardComponent } from "./business-vertical-wizard/business-vertical-wizard.component";
import { CustomVerticalWizardComponent } from "./custom-vertical-wizard/custom-vertical-wizard.component";
import { BusinessHorizontalWizardComponent } from "./business-horizontal-wizard/business-horizontal-wizard.component";
import { CustomHorizontalWizardComponent } from "./custom-horizontal-wizard/custom-horizontal-wizard.component";

@Component({
  selector: 'app-form-wizard2',
  imports: [BusinessVerticalWizardComponent, CustomVerticalWizardComponent,
            BusinessHorizontalWizardComponent, CustomHorizontalWizardComponent],
  templateUrl: './form-wizard2.component.html',
  styleUrl: './form-wizard2.component.scss'
})

export class FormWizard2Component {

}
