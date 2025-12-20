import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { monthlyProfitsChart } from '../../../../../shared/data/dashboard/e-commerce';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-monthly-profits',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './monthly-profits.component.html',
  styleUrl: './monthly-profits.component.scss'
})

export class MonthlyProfitsComponent {

  public cardToggleOption = cardToggleOptions3;
  public profitChart = monthlyProfitsChart;

}
