import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CreateCategoryModalComponent } from '../../../shared/components/ui/modal/create-category-modal/create-category-modal.component';
import { TableComponent } from '../../../shared/components/ui/table/table.component';
import { CategoryFilterComponent } from "./widgets/category-filter/category-filter.component";
import { category } from '../../../shared/data/category';
import { Category } from '../../../shared/interface/category';
import { TableClickedAction, TableConfigs } from '../../../shared/interface/common';

@Component({
  selector: 'app-category',
  imports: [CommonModule, CategoryFilterComponent, TableComponent, CreateCategoryModalComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent {

  public categories: Category[];
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Category', field_value: 'category_name', sort: true },
      { title: 'Description', field_value: 'description', sort: true },
      { title: 'Category Type', field_value: 'category_type', sort: true }
    ],
    row_action: [
      { label: "Edit", action_to_perform: "edit", icon: "edit-content" },
      { label: "Delete", action_to_perform: "delete", icon: "trash1", modal:true, model_text: 'Do you really want to delete the category?' }
    ],
    data: [] as Category[]
  };

  public modalOpen: boolean = false;

  constructor() {
    this.tableConfig.data = this.category(category);
    this.categories = category;
  }

  handleAction(value: TableClickedAction) {
    if (value.action_to_perform === "delete" && value.data) {
      this.categories = this.categories.filter((category: Category) => category.id !== value.data.id);
      this.tableConfig = {...this.tableConfig, data: this.category(this.categories)};
    }
  }

  private category(categories: Category[]) {
    return categories.map((category: Category) => {
      const formattedCategory = { ...category };
      formattedCategory.category_name = `<div class="product-names">
                                <div class="light-product-box">
                                  <img class="max-w-full" src="${category.image}" alt="t-shirt">
                                </div>
                                <p>${category.category_name}</p>
                              </div>`;

      formattedCategory.description = `<p class="f-light">${category.description}</p>`;
      formattedCategory.category_type = `<span class="badge badge-light-${category.color}">${category.category_type}</span>`;
      return formattedCategory;
    })
  }

  openCategoryModal() {
    this.modalOpen = true;
  }

  handleModalOpen(value: boolean) {
    this.modalOpen = value;
  }

  ngOnDestroy() {
    this.tableConfig.data = [];
  }
  
}
