import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { orderStatusChart } from '../../../../../shared/data/widgets/chart';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-order-status',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})

export class OrderStatusComponent {

  public orderStatusChart = orderStatusChart;
  public cardToggleOption = cardToggleOptions1;

}
