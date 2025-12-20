import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-custom-positioned-sweetalert',
  imports: [CardComponent],
  templateUrl: './custom-positioned-sweetalert.component.html',
  styleUrl: './custom-positioned-sweetalert.component.scss'
})

export class CustomPositionedSweetalertComponent {

  open() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
