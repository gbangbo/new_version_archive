import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { sizingTable } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-sizing-table',
  imports: [CardComponent],
  templateUrl: './sizing-table.component.html',
  styleUrl: './sizing-table.component.scss'
})

export class SizingTableComponent {

  public sizingTable = sizingTable;

}
