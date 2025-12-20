import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { tableBorder } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-table-borders',
  imports: [CardComponent],
  templateUrl: './table-borders.component.html',
  styleUrl: './table-borders.component.scss'
})

export class TableBordersComponent {

  public tableBorder = tableBorder;

}
