import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-pagination-icon',
  imports: [CommonModule,CardComponent],
  templateUrl: './pagination-icon.component.html',
  styleUrl: './pagination-icon.component.scss'
})

export class PaginationIconComponent {

  @Input() pageLinkClass = '';
  @Input() headerTitle = 'Pagination With Icons'
  @Input() text = 'Use an icon or symbol in place of text for some pagination links.'
  @Input() ul_class = 'pagination pagination-secondary pagin-border-secondary';

  public currentPage: number = 1;
  public totalPages: number = 20;
  public pages: (number | string)[] = [];

  generatePages() {
    
    const pageNumbers: (number | string)[] = [];
    
    if (this.currentPage > 3) {
      pageNumbers.push(1);
    }

    let startPage = Math.max(1, this.currentPage - 1);
    let endPage = Math.min(this.totalPages, this.currentPage + 1);
    
    if (startPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < this.totalPages - 1) {
      pageNumbers.push('...');
    }

    if (this.totalPages > 1 && endPage !== this.totalPages) {
      pageNumbers.push(this.totalPages);
    }

    this.pages = pageNumbers;
  }

  changePage(page: number | string) {
    if (page === '<<' && this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    } else if (page === '>>' && this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1; 
    } 
    else if (typeof page === 'number') {
      this.currentPage = page;
    }
    this.generatePages();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.generatePages();
    }
  }

  previousPage() {
    if (this.currentPage > this.totalPages) {
      this.currentPage--;
      this.generatePages();
    }
  }

  ngOnInit() {
    this.generatePages();
  }

}
