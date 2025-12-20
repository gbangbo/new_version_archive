import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { product } from '../../../../../shared/interface/form-controls';

@Component({
  selector: 'app-dynamic-form-field',
  imports: [CardComponent],
  templateUrl: './dynamic-form-field.component.html',
  styleUrl: './dynamic-form-field.component.scss'
})

export class DynamicFormFieldComponent {

  public items: product[] = [];

  constructor() {
    this.items.push({
      items: 'Watch',
      price: '550',
      qty: '2',
      total_price: '11000'
    })
  }

  addItem() {
    this.items.push({
      items: '',
      price: '',
      qty: '',
      total_price: ''
    })
  }

  removeItem(i: number) {
    this.items.splice(i, 1);
  }

}
