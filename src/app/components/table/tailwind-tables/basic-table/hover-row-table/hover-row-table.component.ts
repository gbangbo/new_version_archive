import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { hoverAbleTable } from '../../../../../shared/data/tailwind-table';

@Component({
  selector: 'app-hover-row-table',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './hover-row-table.component.html',
  styleUrl: './hover-row-table.component.scss'
})

export class HoverRowTableComponent {

  public hoverAbleTable = hoverAbleTable;

}
