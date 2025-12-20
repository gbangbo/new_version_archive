import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { deliveryDuration } from '../../../../../shared/data/dashboard/logistics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-avg-delivery-duration',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './avg-delivery-duration.component.html',
  styleUrl: './avg-delivery-duration.component.scss'
})

export class AvgDeliveryDurationComponent {

  public cardToggleOption = cardToggleOptions3;
  public deliveryDuration = deliveryDuration;

}
