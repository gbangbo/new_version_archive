import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { AverageDayDetails } from '../../../../../shared/interface/dashboard/crypto';

@Component({
  selector: 'app-average-day-details',
  imports: [NgApexchartsModule, CardComponent, FeatherIconComponent, CounterComponent],
  templateUrl: './average-day-details.component.html',
  styleUrl: './average-day-details.component.scss'
})

export class AverageDayDetailsComponent {

  @Input() details: AverageDayDetails;

}
