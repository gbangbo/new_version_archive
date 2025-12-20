import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { basicTable } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-basic-table-with-border-bottom-color',
  imports: [CardComponent],
  templateUrl: './basic-table-with-border-bottom-color.component.html',
  styleUrl: './basic-table-with-border-bottom-color.component.scss'
})

export class BasicTableWithBorderBottomColorComponent {

  public basicTable = basicTable;

}
