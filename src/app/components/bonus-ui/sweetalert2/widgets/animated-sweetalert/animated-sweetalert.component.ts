import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-animated-sweetalert',
  imports: [CardComponent],
  templateUrl: './animated-sweetalert.component.html',
  styleUrl: './animated-sweetalert.component.scss'
})

export class AnimatedSweetalertComponent {

  open() {
    Swal.fire({
      title: "Custom animation with Animate.css",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    })
  }
}
