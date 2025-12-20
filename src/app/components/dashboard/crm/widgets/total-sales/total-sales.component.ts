import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';

import { totalSalesChart } from '../../../../../shared/data/dashboard/crm';

@Component({
  selector: 'app-total-sales',
  imports: [CommonModule, NgApexchartsModule,RouterModule],
  templateUrl: './total-sales.component.html',
  styleUrl: './total-sales.component.scss'
})

export class TotalSalesComponent {

  public totalSalesChart = totalSalesChart;

}
