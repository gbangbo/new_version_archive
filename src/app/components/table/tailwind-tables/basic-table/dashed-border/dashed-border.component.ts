import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { dashedBorderTable } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-dashed-border',
  imports: [CardComponent],
  templateUrl: './dashed-border.component.html',
  styleUrl: './dashed-border.component.scss'
})

export class DashedBorderComponent {

  public dashedBorderTable = dashedBorderTable;

}
