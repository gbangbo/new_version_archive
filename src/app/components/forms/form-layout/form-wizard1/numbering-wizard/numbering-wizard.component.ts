import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { BasicInfoComponent } from "./widgets/basic-info/basic-info.component";
import { CartInfoComponent } from "./widgets/cart-info/cart-info.component";
import { FeedbackComponent } from "./widgets/feedback/feedback.component";
import { FinishComponent } from "./widgets/finish/finish.component";
import { numberingWizardTabs } from '../../../../../shared/data/form-layout';

@Component({
  selector: 'app-numbering-wizard',
  imports: [FormsModule, CommonModule, BasicInfoComponent,
            CartInfoComponent, FeedbackComponent, FinishComponent, CardComponent],
  templateUrl: './numbering-wizard.component.html',
  styleUrl: './numbering-wizard.component.scss'
})

export class NumberingWizardComponent {

  public numberingTabs = numberingWizardTabs;
  public activeTab: number = 1;

  handleStep(value: number) {
    if(value == -1) {
      this.activeTab = this.activeTab - 1;
    } else if(value == 1 && this.activeTab < this.numberingTabs.length) {
      this.activeTab = this.activeTab + 1;
    }
  }

}
