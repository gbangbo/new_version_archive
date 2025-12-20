import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FeatherIconComponent } from '../../../shared/components/ui/feather-icon/feather-icon.component';
import { CreateStoreModalComponent } from './create-store-modal/create-store-modal.component';
import { StoreCategories, stores } from '../../../shared/data/store';
import { Store } from '../../../shared/interface/store';

@Component({
  selector: 'app-seller',
  imports: [CommonModule, FormsModule, RouterLink, CreateStoreModalComponent, FeatherIconComponent],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.scss'
})
export class SellerComponent {

  public storesCategory = StoreCategories;
  public stores: Store[] = stores;
  public activeCategory?: number;
  public searchQuery: string = '';
  public filteredStores: Store[] = stores;
  public filter: any = {
    search: '',
    store_category_id: undefined
  };
  public modalOpen: boolean = false;

  filterStore(id?: number) {
    this.filter['store_category_id'] = id;
    this.activeCategory = id;
    this.filterDetails();
  }

  searchStores() {
    this.filter['search'] = this.searchQuery.toLowerCase();
    this.filterDetails();
  }

  filterDetails() {
    this.filteredStores = this.stores.filter(store => {
      const matchesCategory = this.filter.store_category_id
        ? store.store_category_id === this.filter.store_category_id
        : true;
      const matchesSearch = this.filter.search
        ? store.store_name.toLowerCase().includes(this.filter.search)
        : true;

      return matchesCategory && matchesSearch;
    });
  }
 
  openModal() {
    this.modalOpen = true;
  }

  handleModalOpen(value: boolean) {
    this.modalOpen = value;
  }
  
}
