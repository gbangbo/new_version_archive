import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-dismiss-sweetalert',
  imports: [CardComponent],
  templateUrl: './dismiss-sweetalert.component.html',
  styleUrl: './dismiss-sweetalert.component.scss'
})

export class DismissSweetalertComponent {

  open() {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>',
    })
  }
}
