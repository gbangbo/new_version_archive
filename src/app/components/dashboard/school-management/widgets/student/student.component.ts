import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { studentChart } from '../../../../../shared/data/dashboard/school-management';
import { cardToggleOptions9 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-student',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})

export class StudentComponent {

  public studentChart = studentChart;
  public cardToggleOption = cardToggleOptions9;
  
}
