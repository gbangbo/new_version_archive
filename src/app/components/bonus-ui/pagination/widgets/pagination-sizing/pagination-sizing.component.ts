import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { paginationSizing } from '../../../../../shared/data/bonus-ui/pagination';
import { CommonPaginationComponent } from "../common-pagination/common-pagination.component";

@Component({
  selector: 'app-pagination-sizing',
  imports: [CardComponent, CommonPaginationComponent],
  templateUrl: './pagination-sizing.component.html',
  styleUrl: './pagination-sizing.component.scss'
})
export class PaginationSizingComponent {

  public paginationSizing = paginationSizing;

}
