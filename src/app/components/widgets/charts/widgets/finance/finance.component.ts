import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { financeChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-finance',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss'
})

export class FinanceComponent {

  public financeChart = financeChart;

}
