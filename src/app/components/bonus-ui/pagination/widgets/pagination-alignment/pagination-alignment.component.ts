import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CommonPaginationComponent } from "../common-pagination/common-pagination.component";

@Component({
  selector: 'app-pagination-alignment',
  imports: [CardComponent, CommonPaginationComponent],
  templateUrl: './pagination-alignment.component.html',
  styleUrl: './pagination-alignment.component.scss'
})

export class PaginationAlignmentComponent {


}
