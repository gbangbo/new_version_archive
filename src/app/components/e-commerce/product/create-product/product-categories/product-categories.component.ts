import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Select2Module } from 'ng-select2-component';
import { TagInputModule } from 'ngx-chips';

import { CreateCategoryModalComponent } from '../../../../../shared/components/ui/modal/create-category-modal/create-category-modal.component';
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { productCategory } from '../../../../../shared/data/product';

@Component({
  selector: 'app-product-categories',
  imports: [TagInputModule, CommonModule, FormsModule,
            AngularEditorModule, Select2Module, SvgIconComponent, 
            CreateCategoryModalComponent],
  templateUrl: './product-categories.component.html',
  styleUrl: './product-categories.component.scss'
})

export class ProductCategoriesComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public productCategory = productCategory;
  public items = ['watches', 'sports', 'clothes', 'bottles'];
  public modalOpen: boolean = false;

  createCategoryModal() {
    this.modalOpen = true;
  }

  handleModalOpen(value: boolean) {
    this.modalOpen = value;
  }

  next() {
    this.active = this.active + 1;
    this.changeTab.emit(this.active);
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);
  }

}
