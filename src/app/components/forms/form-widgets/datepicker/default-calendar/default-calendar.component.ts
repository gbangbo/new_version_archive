import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-default-calendar',
  imports: [CommonModule, OwlNativeDateTimeModule, FormsModule, OwlDateTimeModule, CardComponent],
  templateUrl: './default-calendar.component.html',
  styleUrl: './default-calendar.component.scss'
})
export class DefaultCalendarComponent {

  public selectedMoment = new Date();

}
