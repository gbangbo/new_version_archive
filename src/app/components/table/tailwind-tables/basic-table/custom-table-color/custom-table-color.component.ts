import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { customTable } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-custom-table-color',
  imports: [CardComponent],
  templateUrl: './custom-table-color.component.html',
  styleUrl: './custom-table-color.component.scss'
})

export class CustomTableColorComponent {

  public customTable = customTable;

}
