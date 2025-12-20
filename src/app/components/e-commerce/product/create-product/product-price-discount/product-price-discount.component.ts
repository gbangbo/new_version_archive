import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { bogoProducts, priceDiscount, productPriceTabs } from '../../../../../shared/data/product';

@Component({
  selector: 'app-product-price-discount',
  imports: [Select2Module, SvgIconComponent],
  templateUrl: './product-price-discount.component.html',
  styleUrl: './product-price-discount.component.scss'
})

export class ProductPriceDiscountComponent {

  @Output() changeTab = new EventEmitter<number>();
  
  @Input() active: number;

  public bogoProducts = bogoProducts;
  public priceDiscount = priceDiscount;
  public activeTab: string = 'fixed_price_discount';
  public productPriceTabs = productPriceTabs;

  handleTab(value: string) {
    this.activeTab = value;
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
