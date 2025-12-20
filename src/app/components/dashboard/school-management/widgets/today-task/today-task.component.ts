import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { todayTask } from '../../../../../shared/data/dashboard/school-management';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-today-task',
  imports: [SvgIconComponent, CardComponent,RouterModule],
  templateUrl: './today-task.component.html',
  styleUrl: './today-task.component.scss'
})

export class TodayTaskComponent {

  public todayTask = todayTask;
  public cardToggleOption = cardToggleOptions3;

}
