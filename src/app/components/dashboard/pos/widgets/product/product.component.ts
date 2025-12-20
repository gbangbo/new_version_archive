import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { products } from '../../../../../shared/data/dashboard/pos';
import { OrderDetailsProduct } from '../../../../../shared/interface/order';
import { CartService } from '../../../../../shared/services/cart.service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule, FeatherIconComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {

  public products = products;
  public filteredProduct: OrderDetailsProduct[] = products;
  public searchQuery: string = '';
  public filter = {
    search: '',
  };

  constructor(public cartService: CartService) {}

  updateQuantity(value: number, product: OrderDetailsProduct) {
    if (value === 1 && product.quantity < product.total_quantity) {
      product.quantity += 1;
    } else if (value === -1 && product.quantity > 1) {
      product.quantity -= 1;
    }
  }

  addToCart(product: OrderDetailsProduct) {
    const updatedProduct: OrderDetailsProduct = {
      ...product,
      quantity: product.quantity
    };
    this.cartService.posAddToCart(updatedProduct);
  }

  searchStores() {
    this.filter['search'] = this.searchQuery.toLowerCase();
    this.filterDetails();
  }

  filterDetails() {
    this.filteredProduct = this.products.filter(product => {
      const matchesSearch = this.filter.search
        ? product.product_name.toLowerCase().includes(this.filter.search)
        : true;

      return matchesSearch;
    });
  }
  
}
