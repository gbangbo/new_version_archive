import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { todayProgressChart } from '../../../../../shared/data/dashboard/online-course';

@Component({
  selector: 'app-today-progress',
  imports: [NgApexchartsModule, CardComponent],
  templateUrl: './today-progress.component.html',
  styleUrl: './today-progress.component.scss'
})

export class TodayProgressComponent {

  public todayProgress = todayProgressChart;

}
