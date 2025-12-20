import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { cardToggleOptions3 } from '../../../../../shared/data/common';

@Component({
  selector: 'app-school-calendar',
  imports: [CommonModule, OwlNativeDateTimeModule, OwlDateTimeModule, FormsModule, CardComponent],
  templateUrl: './school-calendar.component.html',
  styleUrl: './school-calendar.component.scss'
})

export class SchoolCalendarComponent {

  public cardToggleOption = cardToggleOptions3;
  public selectedMoment = new Date();

}
