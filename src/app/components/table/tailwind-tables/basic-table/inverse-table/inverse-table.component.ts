import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { inverseTable } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-inverse-table',
  imports: [CardComponent],
  templateUrl: './inverse-table.component.html',
  styleUrl: './inverse-table.component.scss'
})

export class InverseTableComponent {

  public inverseTable = inverseTable;

}
