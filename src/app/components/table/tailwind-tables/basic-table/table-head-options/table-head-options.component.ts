import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { tableHeadOption } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-table-head-options',
  imports: [CardComponent],
  templateUrl: './table-head-options.component.html',
  styleUrl: './table-head-options.component.scss'
})

export class TableHeadOptionsComponent {

  public tableHeadOption = tableHeadOption;

}
