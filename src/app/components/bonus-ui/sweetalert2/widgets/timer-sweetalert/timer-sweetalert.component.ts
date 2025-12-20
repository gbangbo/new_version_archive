import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-timer-sweetalert',
  imports: [CardComponent],
  templateUrl: './timer-sweetalert.component.html',
  styleUrl: './timer-sweetalert.component.scss'
})

export class TimerSweetalertComponent {

  open() {
    let timerInterval: any;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal?.getPopup()?.querySelector("b");
        if(timer)
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    })
  }
  
}
