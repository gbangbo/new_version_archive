import { Component } from '@angular/core';
import { cardToggleOptions3 } from '../../../../../shared/data/common';

import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { todayTask } from '../../../../../shared/data/dashboard/projects';

@Component({
  selector: 'app-today-task',
  imports: [SvgIconComponent, CardComponent],
  templateUrl: './today-task.component.html',
  styleUrl: './today-task.component.scss'
})

export class TodayTaskComponent {

    public cardToggleOption = cardToggleOptions3;
    public todayTask = todayTask;

}
