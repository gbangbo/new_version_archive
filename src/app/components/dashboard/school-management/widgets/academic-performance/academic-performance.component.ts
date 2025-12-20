import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { academicPerformance } from '../../../../../shared/data/dashboard/school-management';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-academic-performance',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './academic-performance.component.html',
  styleUrl: './academic-performance.component.scss'
})

export class AcademicPerformanceComponent {

  public cardToggleOption = cardToggleOptions3;
  public academicPerformance = academicPerformance;

}
