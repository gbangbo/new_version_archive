import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { nestingTable } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-nesting-table',
  imports: [CardComponent],
  templateUrl: './nesting-table.component.html',
  styleUrl: './nesting-table.component.scss'
})

export class NestingTableComponent {

  public nestingTable = nestingTable;

}
