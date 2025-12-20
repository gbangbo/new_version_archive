import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-basic-sweetalert',
  imports: [CardComponent],
  templateUrl: './basic-sweetalert.component.html',
  styleUrl: './basic-sweetalert.component.scss'
})

export class BasicSweetalertComponent {

  open() {
    Swal.fire("Welcome! to the cuba theme!")
  }
}
