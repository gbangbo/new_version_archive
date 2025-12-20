import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-confirmation-trigger-sweetalert',
  imports: [CardComponent],
  templateUrl: './confirmation-trigger-sweetalert.component.html',
  styleUrl: './confirmation-trigger-sweetalert.component.scss'
})

export class ConfirmationTriggerSweetalertComponent {

  open() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16C7F9",
      cancelButtonColor: "#FC4438",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }
}
