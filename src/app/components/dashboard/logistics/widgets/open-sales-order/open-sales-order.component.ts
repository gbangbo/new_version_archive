import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { openSalesOrder } from '../../../../../shared/data/dashboard/logistics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-open-sales-order',
  imports: [CommonModule, NgApexchartsModule, CardComponent, CounterComponent],
  templateUrl: './open-sales-order.component.html',
  styleUrl: './open-sales-order.component.scss'
})

export class OpenSalesOrderComponent {

  public cardToggleOption = cardToggleOptions3;
  public openSalesOrder = openSalesOrder;

}
