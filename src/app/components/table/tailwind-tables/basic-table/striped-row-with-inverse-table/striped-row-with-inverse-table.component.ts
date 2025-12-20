import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { stripedRow } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-striped-row-with-inverse-table',
  imports: [CardComponent],
  templateUrl: './striped-row-with-inverse-table.component.html',
  styleUrl: './striped-row-with-inverse-table.component.scss'
})

export class StripedRowWithInverseTableComponent {

  public stripedRow = stripedRow;

}
