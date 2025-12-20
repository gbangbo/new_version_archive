import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-date-sweetalert',
  imports: [CardComponent],
  templateUrl: './date-sweetalert.component.html',
  styleUrl: './date-sweetalert.component.scss'
})

export class DateSweetalertComponent {

  async open() {
    const { value: date } = await Swal.fire({
      title: "Select departure date",
      input: "date",
      didOpen: () => {
        const today = new Date().toISOString();
        const inputElement = Swal.getInput();
        if (inputElement) { 
          inputElement.min = today.split("T")[0];
        }
      },
    });
    if (date) {
      Swal.fire("Departure date", date);
    }
  }
}
