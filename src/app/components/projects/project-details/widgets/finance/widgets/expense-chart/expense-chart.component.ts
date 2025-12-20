import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from "../../../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { Expenses } from '../../../../../../../shared/interface/project';

@Component({
  selector: 'app-expense-chart',
  imports: [NgApexchartsModule, CardComponent, FeatherIconComponent],
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.scss'
})

export class ExpenseChartComponent {

  @Input() chart: Expenses;

}
