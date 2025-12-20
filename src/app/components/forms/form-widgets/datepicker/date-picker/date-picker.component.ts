import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-date-picker',
  imports: [CommonModule, OwlNativeDateTimeModule, FormsModule, OwlDateTimeModule, CardComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {

  public min = new Date(2022, 1, 12, 10, 30);
  public max = new Date(2026, 3, 21, 20, 30);

}
