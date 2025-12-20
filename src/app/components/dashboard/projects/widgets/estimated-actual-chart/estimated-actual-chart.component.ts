import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { estimatedActualChart } from '../../../../../shared/data/dashboard/projects';

@Component({
  selector: 'app-estimated-actual-chart',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './estimated-actual-chart.component.html',
  styleUrl: './estimated-actual-chart.component.scss'
})

export class EstimatedActualChartComponent {

  public cardToggleOption = cardToggleOptions3;
  public estimatedActualChart = estimatedActualChart;
  
}
