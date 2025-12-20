import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})

export class PaginationComponent {

  @Input() public total: number;
  @Input() public currentPage: number;
  @Input() public pageSize: number;
  @Input() paginate: any = {};
  @Input() paginateDetails: boolean;
  @Input() selectedItems: number;
  @Input() selectedRows: boolean;

  @Output() setPage: EventEmitter<number> = new EventEmitter();
  
  // Set Page
  pageSet(page: number) {
    this.setPage.emit(page);  // Set Page Number
  }
  
}
