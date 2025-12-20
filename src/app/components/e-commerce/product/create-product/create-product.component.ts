import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { SvgIconComponent } from '../../../../shared/components/ui/svg-icon/svg-icon.component';
import { AddProductDetailsComponent } from "./add-product-details/add-product-details.component";
import { AdditionalOptionsComponent } from "./additional-options/additional-options.component";
import { ProductCategoriesComponent } from "./product-categories/product-categories.component";
import { ProductGalleryComponent } from "./product-gallery/product-gallery.component";
import { ProductPriceDiscountComponent } from "./product-price-discount/product-price-discount.component";
import { addProduct } from '../../../../shared/data/product';

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, OwlNativeDateTimeModule, 
           SvgIconComponent, AddProductDetailsComponent, ProductGalleryComponent, 
           ProductCategoriesComponent, ProductPriceDiscountComponent, AdditionalOptionsComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})

export class CreateProductComponent {
  
  public active = 1;
  public addProduct = addProduct;
  public activeTab: string = 'product';

  changeTab(value: number) {
    this.active = value;

    if(this.active) {
      const tab = addProduct.find(tab => tab.id == this.active)
      
      if(tab) {
        this.activeTab = tab.value;
      }
    }
  }

  handleTab(value: string) {
    this.activeTab = value;
  }

}
