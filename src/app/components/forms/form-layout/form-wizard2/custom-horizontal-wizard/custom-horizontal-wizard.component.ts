import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CompletedComponent } from './widgets/completed/completed.component';
import { ConnectBankAccountComponent } from "./widgets/connect-bank-account/connect-bank-account.component";
import { InquiriesComponent } from "./widgets/inquiries/inquiries.component";
import { PersonalInfoComponent } from './widgets/personal-info/personal-info.component';
import { customHorizontalWizard } from '../../../../../shared/data/form-widgets';

@Component({
  selector: 'app-custom-horizontal-wizard',
  imports: [FormsModule, CommonModule, PersonalInfoComponent,
            ConnectBankAccountComponent, InquiriesComponent, CompletedComponent, CardComponent],
  templateUrl: './custom-horizontal-wizard.component.html',
  styleUrl: './custom-horizontal-wizard.component.scss'
})

export class CustomHorizontalWizardComponent {

  @Input() type: string = '';
  @Input() title: string = 'Custom Horizontal Wizard';
 
  public customHorizontal = customHorizontalWizard;
  public activeTab = 1;
  
  changeTab(value: number) {
    this.activeTab = value;
  }
  
}
