import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { pipelineBreakdownChart } from '../../../../../shared/data/dashboard/crm';
import { cardToggleOptions5 } from './../../../../../shared/data/common';

@Component({
  selector: 'app-pipeline-breakdown',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './pipeline-breakdown.component.html',
  styleUrl: './pipeline-breakdown.component.scss'
})

export class PipelineBreakdownComponent {

  public pipelineBreakdownChart = pipelineBreakdownChart;
  public cardToggleOption = cardToggleOptions5;

}
