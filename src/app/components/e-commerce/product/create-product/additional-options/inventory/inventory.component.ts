import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Select2Module } from 'ng-select2-component';

import { SvgIconComponent } from "../../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { stockAvailability, stockLevel } from '../../../../../../shared/data/product';

@Component({
  selector: 'app-inventory',
  imports: [Select2Module, SvgIconComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})

export class InventoryComponent {
  
  @Output() changeTab = new EventEmitter<number>();
  @Output() changeTabDetails = new EventEmitter<number>();

  @Input() active: number;
  @Input() additionalActiveId: number

  public stockAvailability = stockAvailability;
  public stockLevel = stockLevel;

  next() {
    this.additionalActiveId = this.additionalActiveId + 1;
    this.changeTabDetails.emit(this.additionalActiveId);
  }

  previous() {
    this.active = this.active - 1;
    this.changeTab.emit(this.active);

  }

}
