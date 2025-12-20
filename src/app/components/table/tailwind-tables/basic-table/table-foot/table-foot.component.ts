import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { tableFoot } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-table-foot',
  imports: [CardComponent],
  templateUrl: './table-foot.component.html',
  styleUrl: './table-foot.component.scss'
})

export class TableFootComponent {

  public tableFoot = tableFoot;

}
