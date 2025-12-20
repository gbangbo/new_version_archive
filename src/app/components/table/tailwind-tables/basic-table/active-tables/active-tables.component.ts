import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { activeTable } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-active-tables',
  imports: [CardComponent],
  templateUrl: './active-tables.component.html',
  styleUrl: './active-tables.component.scss'
})

export class ActiveTablesComponent {

  public activeTable = activeTable;
  
}
