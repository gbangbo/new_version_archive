import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-project-budget',
  imports: [CommonModule, CardComponent],
  templateUrl: './project-budget.component.html',
  styleUrl: './project-budget.component.scss'
})

export class ProjectBudgetComponent {

  public budgetValue: number = 1;

  changeValue(value: number) {
    if(value == -1 && this.budgetValue > 1) {
      this.budgetValue -= 1;
    } else if(value == 1) {
      this.budgetValue += 1;
    }
  }
  
}
