import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { salesStatisticalChart } from '../../../../../shared/data/dashboard/default';
import { cardToggleOptions2 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-sales-statistical',
  imports: [CommonModule, NgApexchartsModule, CardComponent, CounterComponent],
  templateUrl: './sales-statistical.component.html',
  styleUrl: './sales-statistical.component.scss'
})

export class SalesStatisticalComponent {

  public cardToggleOptions = cardToggleOptions2;
  public salesStatisticalChart = salesStatisticalChart;
  
}
