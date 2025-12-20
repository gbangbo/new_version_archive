import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { monthOrderChart } from '../../../../../shared/data/dashboard/e-commerce';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-month-order',
  imports: [CommonModule, NgApexchartsModule, CardComponent],
  templateUrl: './month-order.component.html',
  styleUrl: './month-order.component.scss'
})

export class MonthOrderComponent {

  public cardToggleOption = cardToggleOptions3;
  public orderChart = monthOrderChart;

}
