import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { SvgIconComponent } from "../../../../../shared/components/ui/svg-icon/svg-icon.component";
import { days, todaySchedule } from '../../../../../shared/data/dashboard/hr';
import { Days, TodaySchedule } from '../../../../../shared/interface/dashboard/hr';

@Component({
  selector: 'app-today-schedule',
  imports: [CommonModule, SvgIconComponent, CardComponent],
  templateUrl: './today-schedule.component.html',
  styleUrl: './today-schedule.component.scss'
})
export class TodayScheduleComponent {

  public days = days;
  public todaySchedule = todaySchedule;
  public activeDay: string = 'mon';
  public filteredSchedule: TodaySchedule[];

  ngOnInit() {
    if(this.activeDay) {
      this.filteredSchedule = this.todaySchedule.filter((details) => {
        return details.value === this.activeDay
      })
    }
  }

  changeDay(day: Days) {
    this.activeDay = day.value;
  
    this.filteredSchedule = this.todaySchedule.filter((schedule) => {
      return schedule.value === this.activeDay;
    });
  }
  
}
