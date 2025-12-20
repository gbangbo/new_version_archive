import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { schoolPerformance } from '../../../../../shared/data/dashboard/school-management';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-school-performance',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './school-performance.component.html',
  styleUrl: './school-performance.component.scss'
})

export class SchoolPerformanceComponent {

  public schoolPerformance = schoolPerformance;
  public cardToggleOption = cardToggleOptions3;

}
