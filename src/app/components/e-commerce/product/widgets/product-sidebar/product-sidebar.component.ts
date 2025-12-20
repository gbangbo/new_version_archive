import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';

import { brands, category, colors, discount, products } from '../../../../../shared/data/product';
import { ProductService } from '../../../../../shared/services/product.service';

@Component({
  selector: 'app-product-sidebar',
  imports: [CommonModule, BarRatingModule, NgxSliderModule],
  templateUrl: './product-sidebar.component.html',
  styleUrl: './product-sidebar.component.scss'
})

export class  ProductSidebarComponent {

  public category = category;
  public brands = brands;
  public colors = colors;
  public discount = discount;
  public rating: number[] = Array.from({length: 5}, (_, i) => i + 1);

  public value: number = 800;
  public maxValue: number = 200;
  public priceArray: number[] = [];

  public sliderOption: Options = {
    floor: 0,
    ceil: 200
  };

  public filter = {
    category: '',
    brand: '',
    color: '',
    discount: '',
    rating: null
  };

  constructor(private productService: ProductService) {
    products.forEach((price) => {
      this.priceArray.push(price.price);
    });
    let maxPrice = Math.max(...this.priceArray);

    this.sliderOption = {
      floor: 0,
      ceil: maxPrice
    }
  }

  toggleSidebar() {
    this.productService.sidebarOpen =! this.productService.sidebarOpen;
  }

  handleColor(color: string) {
    this.filter['color'] = color;
  }
  
}
