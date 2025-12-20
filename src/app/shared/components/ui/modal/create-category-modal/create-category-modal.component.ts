import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Select2Data, Select2Module } from 'ng-select2-component';

import { category, categoryStatus } from '../../../../data/category';
import { Category } from '../../../../interface/category';
import { OutsideDirective } from '../../../../directives/outside.directive';

@Component({
  selector: 'app-create-category-modal',
  imports: [AngularEditorModule, Select2Module, OutsideDirective],
  templateUrl: './create-category-modal.component.html',
  styleUrl: './create-category-modal.component.scss'
})

export class CreateCategoryModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  public category: Category[] = category;
  public categoryStatus = categoryStatus;
  public parentCategory: Select2Data = [];
  public categoryType: Select2Data = [];

  constructor() {
    this.category.filter((category) => {
      this.parentCategory.push({ value: category.category_name, label: category.category_name });
      this.categoryType.push({ value: category.category_type, label: category.category_type });
    })
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.close();
  }

  close() {
    this.modalOpen.emit(false);
  }
  
}
