import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Product } from '../../../../interface/product';
import { OutsideDirective } from '../../../../directives/outside.directive';

@Component({
  selector: 'app-product-details-modal',
  imports: [RouterModule, OutsideDirective],
  templateUrl: './product-details-modal.component.html',
  styleUrl: './product-details-modal.component.scss'
})

export class ProductDetailsModalComponent {

  @Output() modalOpen = new EventEmitter<boolean>();

  @Input() productDetail: Product;

  public counter : number = 1;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey() {
    this.closeModal();
  }

  changeValue(value: number) {
    if(value == -1){
      if(this.counter > 1){
        this.counter -= 1;
      }
    }else if(value == 1){
      this.counter += 1;
    }
  }

  closeModal() {
    this.modalOpen.emit(false);
  }
  
}
