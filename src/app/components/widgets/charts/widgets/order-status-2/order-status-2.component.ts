import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { orderStatusChart2 } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-order-status-2',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './order-status-2.component.html',
  styleUrl: './order-status-2.component.scss'
})

export class OrderStatus2Component {

  public orderStatusChart2 = orderStatusChart2;

}
