import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CartInfoComponent } from './widgets/cart-info/cart-info.component';
import { NetBankingComponent } from "./widgets/net-banking/net-banking.component";
import { YourInfoComponent } from "./widgets/your-info/your-info.component";
import { verticalValidation } from '../../../../../shared/data/form-layout';

@Component({
  selector: 'app-vertical-validation-wizard',
  imports: [CommonModule, FormsModule, YourInfoComponent,
            CartInfoComponent, NetBankingComponent, CardComponent],
  templateUrl: './vertical-validation-wizard.component.html',
  styleUrl: './vertical-validation-wizard.component.scss'
})

export class VerticalValidationWizardComponent {

  public verticalValidation = verticalValidation;
  public activeTab = 1;

  changeTab(value: number) {
    this.activeTab = value;
  }

}
