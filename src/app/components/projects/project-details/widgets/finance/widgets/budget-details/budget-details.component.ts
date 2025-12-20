import { Component } from '@angular/core';

import { CardComponent } from "../../../../../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../../../../../shared/components/ui/table/table.component';
import { projectDetails } from '../../../../../../../shared/data/project';
import { TableConfigs } from '../../../../../../../shared/interface/common';

@Component({
  selector: 'app-budget-details',
  imports: [CardComponent, TableComponent],
  templateUrl: './budget-details.component.html',
  styleUrl: './budget-details.component.scss'
})

export class BudgetDetailsComponent {

  public tableConfig: TableConfigs = {
      columns: [
        { title: 'Type', field_value: 'type', sort: true },
        { title: 'Total Budget', field_value: 'total_budget', sort: true, type: 'price', decimal_number: true },
        { title: 'Expenses (USD)', field_value: 'expenses', sort: true, type: 'price', decimal_number: true },
        { title: 'Remaining (USD)', field_value: 'remaining', sort: true, type: 'price', decimal_number: true }
      ],
      data: projectDetails.finance.budget_details
    };
    
}
