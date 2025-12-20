import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { monthlySalesChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-monthly-sales',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './monthly-sales.component.html',
  styleUrl: './monthly-sales.component.scss'
})

export class MonthlySalesComponent {

  public monthlySalesChart = monthlySalesChart;

}
