import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

import { revenueGrowthChart } from '../../../../../shared/data/dashboard/crm';

@Component({
  selector: 'app-revenue-growth',
  imports: [NgApexchartsModule,RouterModule],
  templateUrl: './revenue-growth.component.html',
  styleUrl: './revenue-growth.component.scss'
})

export class RevenueGrowthComponent {

  public revenueGrowthChart = revenueGrowthChart;
  
}
