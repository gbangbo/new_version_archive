import { Component } from '@angular/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { Select2Module } from 'ng-select2-component';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { paymentMethod, paymentStatus } from '../../../../../shared/data/order';

@Component({
  selector: 'app-order-filter',
  imports: [OwlDateTimeModule, OwlNativeDateTimeModule, Select2Module, CardComponent],
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.scss'
})

export class OrderFilterComponent {

  public paymentStatus = paymentStatus;
  public paymentMethod = paymentMethod;

}
