import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { SvgIconComponent } from '../../../../../../shared/components/ui/svg-icon/svg-icon.component';
import { shippingClass } from '../../../../../../shared/data/product';

@Component({
  selector: 'app-shipping',
  imports: [Select2Module, SvgIconComponent],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss'
})

export class ShippingComponent {

  @Output() changeTabDetails = new EventEmitter<number>();
  
  @Input() additionalActiveId: number

  public shippingClass = shippingClass;

  next() {
      this.additionalActiveId = this.additionalActiveId + 1;
       this.changeTabDetails.emit( this.additionalActiveId);
   }

   previous() {
    this.additionalActiveId = this.additionalActiveId - 1;
    this.changeTabDetails.emit( this.additionalActiveId);
  }
  
}
