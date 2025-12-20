import { Component } from '@angular/core';

import { BusinessVerticalWizardComponent } from "../business-vertical-wizard/business-vertical-wizard.component";

@Component({
  selector: 'app-business-horizontal-wizard',
  imports: [BusinessVerticalWizardComponent],
  templateUrl: './business-horizontal-wizard.component.html',
  styleUrl: './business-horizontal-wizard.component.scss'
})

export class BusinessHorizontalWizardComponent {

}
