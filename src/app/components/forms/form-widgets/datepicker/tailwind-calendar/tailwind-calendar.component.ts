import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-tailwind-calendar',
  imports: [CommonModule, OwlNativeDateTimeModule, FormsModule, OwlDateTimeModule, CardComponent],
  templateUrl: './tailwind-calendar.component.html',
  styleUrl: './tailwind-calendar.component.scss'
})
export class TailwindCalendarComponent {


}
