import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CommonPaginationComponent } from "../common-pagination/common-pagination.component";

@Component({
  selector: 'app-pagination-active-disable',
  imports: [CardComponent, CommonPaginationComponent],
  templateUrl: './pagination-active-disable.component.html',
  styleUrl: './pagination-active-disable.component.scss'
})

export class PaginationActiveDisableComponent {

}
