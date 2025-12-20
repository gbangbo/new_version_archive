import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { DefaultCalendarComponent } from './default-calendar/default-calendar.component';
import { TailwindCalendarComponent } from './tailwind-calendar/tailwind-calendar.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TimePickerComponent } from "./time-picker/time-picker.component";

@Component({
  selector: 'app-datepicker',
  imports: [CommonModule, DefaultCalendarComponent, TailwindCalendarComponent, DatePickerComponent, TimePickerComponent],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss'
})

export class DatepickerComponent {

}
