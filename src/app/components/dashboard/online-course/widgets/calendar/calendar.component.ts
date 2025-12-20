import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-calendar',
  imports: [OwlNativeDateTimeModule, OwlDateTimeModule, FormsModule, CardComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})

export class CalendarComponent {

  public selectedMoment = new Date();
  
}
