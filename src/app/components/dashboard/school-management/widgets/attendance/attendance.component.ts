import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { attendance } from '../../../../../shared/data/dashboard/school-management';
import { cardToggleOptions1 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-attendance',
  imports: [CardComponent, NgApexchartsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})

export class AttendanceComponent {

  public cardToggleOption = cardToggleOptions1;
  public attendance = attendance;

}
