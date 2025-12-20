import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { SvgIconComponent } from '../../../../../shared/components/ui/svg-icon/svg-icon.component';
import { CounterComponent } from "../../../../../shared/components/ui/counter/counter.component";
import { CurrencyChart } from '../../../../../shared/interface/dashboard/crypto';

@Component({
  selector: 'app-currency-chart',
  imports: [CommonModule, NgApexchartsModule, CardComponent,
            SvgIconComponent, FeatherIconComponent, CounterComponent],
  templateUrl: './currency-chart.component.html',
  styleUrl: './currency-chart.component.scss'
})

export class CurrencyChartComponent {

  @Input() chart: CurrencyChart;

}
