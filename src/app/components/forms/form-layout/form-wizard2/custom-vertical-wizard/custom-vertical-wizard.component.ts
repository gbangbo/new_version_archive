import { Component } from '@angular/core';

import { CustomHorizontalWizardComponent } from "../custom-horizontal-wizard/custom-horizontal-wizard.component";

@Component({
  selector: 'app-custom-vertical-wizard',
  imports: [CustomHorizontalWizardComponent],
  templateUrl: './custom-vertical-wizard.component.html',
  styleUrl: './custom-vertical-wizard.component.scss'
})

export class CustomVerticalWizardComponent {

}
