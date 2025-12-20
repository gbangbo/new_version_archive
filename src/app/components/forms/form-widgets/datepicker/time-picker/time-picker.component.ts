import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-time-picker',
  imports: [CommonModule, OwlNativeDateTimeModule, FormsModule, OwlDateTimeModule, CardComponent],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss'
})

export class TimePickerComponent {

}
