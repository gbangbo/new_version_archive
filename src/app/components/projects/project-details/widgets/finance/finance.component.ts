import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BudgetDetailsComponent } from "./widgets/budget-details/budget-details.component";
import { BudgetDistributionComponent } from "./widgets/budget-distribution/budget-distribution.component";
import { ExpenseChartComponent } from "./widgets/expense-chart/expense-chart.component";
import { ProjectBudgetComponent } from "./widgets/project-budget/project-budget.component";
import { projectDetails } from '../../../../../shared/data/project';

@Component({
  selector: 'app-finance',
  imports: [CommonModule, ExpenseChartComponent, BudgetDetailsComponent, 
            BudgetDistributionComponent, ProjectBudgetComponent],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})
export class FinanceComponent {

  public expenseCharts = projectDetails.finance.expenses;

}
