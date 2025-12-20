import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-rtl-support-sweetalert',
  imports: [CardComponent],
  templateUrl: './rtl-support-sweetalert.component.html',
  styleUrl: './rtl-support-sweetalert.component.scss'
})

export class RtlSupportSweetalertComponent {

  open() {
    Swal.fire({
      title: "هل تريد الاستمرار؟",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      showCancelButton: true,
      showCloseButton: true,
    });
  }
  
}
