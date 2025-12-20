import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../../../shared/components/ui/card/card.component";
import { projectDetails } from '../../../../../../../shared/data/project';

@Component({
  selector: 'app-budget-distribution',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './budget-distribution.component.html',
  styleUrl: './budget-distribution.component.scss'
})

export class BudgetDistributionComponent {

  public budgetDistributionChart = projectDetails.finance.budget_distribution;
  
}
