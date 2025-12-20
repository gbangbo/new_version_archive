import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FeatherIconComponent } from "../../../shared/components/ui/feather-icon/feather-icon.component";
import { AccountInfoComponent } from "./widgets/account-info/account-info.component";
import { AddressInfoComponent } from "./widgets/address-info/address-info.component";
import { IdentityInfoComponent } from "./widgets/identity-info/identity-info.component";
import { PersonalInfoComponent } from "./widgets/personal-info/personal-info.component";
import { registerTab } from '../../../shared/data/register-wizard';

@Component({
  selector: 'app-register-wizard',
  imports: [CommonModule, FormsModule, RouterModule, 
            FeatherIconComponent, AccountInfoComponent, AddressInfoComponent,
            IdentityInfoComponent, PersonalInfoComponent],
  templateUrl: './register-wizard.component.html',
  styleUrl: './register-wizard.component.scss'
})

export class RegisterWizardComponent {

  public registerTab = registerTab;
  public activeTab: number = 1;
  public toast = {
    success: false,
    warning: false,
    error: false
  }

  handleStep(value: number) {
    if (value == -1) {
      this.activeTab = this.activeTab - 1;
    } else if (value == 1 && this.activeTab < this.registerTab.length) {
      this.activeTab = this.activeTab + 1;
    }
  }

  showToast(value: keyof typeof this.toast) {
    this.toast[value] = true;

    setTimeout(() => {
      this.toast[value] = false;
    }, 5000);
  }
  closeToast(value: keyof typeof this.toast) {
    this.toast[value] = false;
  }
}
