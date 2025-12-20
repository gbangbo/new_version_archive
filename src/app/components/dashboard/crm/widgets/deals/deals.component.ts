import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { deals } from './../../../../../shared/data/dashboard/crm';
import { cardToggleOptions5 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-deals',
  imports: [CardComponent, TableComponent],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.scss'
})

export class DealsComponent {

  public cardToggleOption = cardToggleOptions5;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Deal id', field_value: 'deal_id', sort: true },
      { title: 'Deal Name', field_value: 'deal_name', sort: true },
      { title: 'Amount', field_value: 'amount', sort: true, type: 'price'},
      { title: 'Close Date', field_value: 'close_date', sort: true },
    ],
    data: deals
  };
  
}
