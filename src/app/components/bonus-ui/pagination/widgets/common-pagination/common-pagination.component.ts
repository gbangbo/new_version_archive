import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-pagination',
  imports: [CommonModule],
  templateUrl: './common-pagination.component.html',
  styleUrl: './common-pagination.component.scss'
})
export class CommonPaginationComponent {

  @Input() ul_class = '';
  @Input() paginationFormat: 'number' | 'romanUppercase' | 'romanLowercase' = 'number';

  public currentPage: number = 1; 
  public totalPages: number = 20; 
  public pagesPerGroup: number = 3;
  public pages: number[] = []; 
  public romanPagesUppercase: string[] = [];
  public romanPagesLowercase: string[] = [];
  public currentRomanPagesUppercase: string[] = [];
  public currentRomanPagesLowercase: string[] = [];

  generatePages() {
    const startPage = this.pagesPerGroup * Math.floor((this.currentPage - 1) / this.pagesPerGroup) + 1;
    const endPage = Math.min(startPage + this.pagesPerGroup - 1, this.totalPages);
    
    this.pages = [];
    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }

    this.generateRomanPages();
    this.updateRomanPageSubset();
  }

  generateRomanPages() {
    this.romanPagesUppercase = [];
    this.romanPagesLowercase = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.romanPagesUppercase.push(this.convertToRoman(i, true));
      this.romanPagesLowercase.push(this.convertToRoman(i, false));
    }
  }

  updateRomanPageSubset() {
    const startPage = this.pagesPerGroup * Math.floor((this.currentPage - 1) / this.pagesPerGroup);

    this.currentRomanPagesUppercase = [];
    this.currentRomanPagesLowercase = [];

    for (let i = startPage; i < startPage + this.pagesPerGroup && i < this.totalPages; i++) {
      this.currentRomanPagesUppercase.push(this.romanPagesUppercase[i]);
      this.currentRomanPagesLowercase.push(this.romanPagesLowercase[i]);
    }
  }

  currentRomanPageToDisplay(page: number): any {
    if (this.paginationFormat === 'romanUppercase') {
      return this.convertToRoman(page, true);
    }
    if (this.paginationFormat === 'romanLowercase') {
      return this.convertToRoman(page, false);
    }
    return page.toString();
  }

  convertToRoman(num: number, uppercase: boolean): string {
    const romanNumerals: string[] = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];
    
    if (num <= 20) {
      const roman = romanNumerals[num - 1];
      return uppercase ? roman : roman.toLowerCase();
    }
    return num.toString();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.generatePages();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.generatePages();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.generatePages();
    }
  }

  ngOnInit() {
    this.generatePages();
  }
  
}
