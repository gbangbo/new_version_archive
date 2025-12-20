import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { stripedColumn } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-striped-columns',
  imports: [CardComponent],
  templateUrl: './striped-columns.component.html',
  styleUrl: './striped-columns.component.scss'
})

export class StripedColumnsComponent {

  public stripedColumn = stripedColumn;

}
