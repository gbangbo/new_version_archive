import { Component } from '@angular/core';

import { DefaultPaginationComponent } from "./widgets/default-pagination/default-pagination.component";
import { PaginationActiveDisableComponent } from "./widgets/pagination-active-disable/pagination-active-disable.component";
import { PaginationIconComponent } from "./widgets/pagination-icon/pagination-icon.component";
import { RoundedPaginationComponent } from "./widgets/rounded-pagination/rounded-pagination.component";
import { PaginationAlignmentComponent } from "./widgets/pagination-alignment/pagination-alignment.component";
import { PaginationSizingComponent } from "./widgets/pagination-sizing/pagination-sizing.component";

@Component({
  selector: 'app-pagination',
  imports: [DefaultPaginationComponent, PaginationActiveDisableComponent, PaginationIconComponent,
            RoundedPaginationComponent, PaginationAlignmentComponent, PaginationSizingComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})

export class PaginationComponent {

}
