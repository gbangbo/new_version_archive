import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CommonPaginationComponent } from "../common-pagination/common-pagination.component";

@Component({
  selector: 'app-default-pagination',
  imports: [CardComponent, CommonPaginationComponent],
  templateUrl: './default-pagination.component.html',
  styleUrl: './default-pagination.component.scss'
})

export class DefaultPaginationComponent {

}
