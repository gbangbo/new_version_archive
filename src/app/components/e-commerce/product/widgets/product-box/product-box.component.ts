import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BarRatingModule } from "ngx-bar-rating";

import { ProductDetailsModalComponent } from '../../../../../shared/components/ui/modal/product-details-modal/product-details-modal.component';
import { Product } from '../../../../../shared/interface/product';

@Component({
  selector: 'app-product-box',
  imports: [CommonModule, RouterModule, BarRatingModule, ProductDetailsModalComponent],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})

export class ProductBoxComponent {

  @Input() product: Product;
  
  public modalOpen: boolean = false;

  openModal() {
    this.modalOpen = true;
  }

  handleModalOpen(value: boolean) {
    this.modalOpen = value;
  }
  
}
