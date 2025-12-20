import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { tableWithoutBorder } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-table-without-borders',
  imports: [CardComponent],
  templateUrl: './table-without-borders.component.html',
  styleUrl: './table-without-borders.component.scss'
})

export class TableWithoutBordersComponent {

  public tableWithoutBorder = tableWithoutBorder;

}
