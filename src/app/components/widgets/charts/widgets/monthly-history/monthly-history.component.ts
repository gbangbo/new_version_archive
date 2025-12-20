import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { monthlyHistoryChart } from '../../../../../shared/data/widgets/chart';

@Component({
  selector: 'app-monthly-history',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './monthly-history.component.html',
  styleUrl: './monthly-history.component.scss'
})

export class MonthlyHistoryComponent {

  public monthlyHistoryChart = monthlyHistoryChart;

}
