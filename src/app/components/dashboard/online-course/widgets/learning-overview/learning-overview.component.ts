import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { learningOverviewChart } from '../../../../../shared/data/dashboard/online-course';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-learning-overview',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './learning-overview.component.html',
  styleUrl: './learning-overview.component.scss'
})

export class LearningOverviewComponent {

  public cardToggleOption = cardToggleOptions3;
  public learningOverviewChart = learningOverviewChart;

}
