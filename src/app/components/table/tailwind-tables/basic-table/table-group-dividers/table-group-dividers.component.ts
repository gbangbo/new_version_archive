import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { tableGroupDividers } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-table-group-dividers',
  imports: [CardComponent],
  templateUrl: './table-group-dividers.component.html',
  styleUrl: './table-group-dividers.component.scss'
})

export class TableGroupDividersComponent {
  
  public tableGroupDividers = tableGroupDividers;

}
