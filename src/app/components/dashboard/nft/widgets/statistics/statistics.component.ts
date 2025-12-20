import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { statistics } from '../../../../../shared/data/dashboard/nft';
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";

@Component({
  selector: 'app-statistics',
  imports: [CommonModule, NgApexchartsModule, CardComponent, CounterComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})

export class StatisticsComponent {

  public statistics = statistics;

}
