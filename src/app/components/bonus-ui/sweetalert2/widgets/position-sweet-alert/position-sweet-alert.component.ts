import { Component, Input } from '@angular/core';
import Swal, { SweetAlertPosition } from 'sweetalert2';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-position-sweet-alert',
  imports: [CardComponent],
  templateUrl: './position-sweet-alert.component.html',
  styleUrl: './position-sweet-alert.component.scss'
})
export class PositionSweetAlertComponent {

  @Input() title: string;
  @Input() position: SweetAlertPosition;
  @Input() buttonColor: string; 
  
  open() {
    Swal.fire({
      title: 'Signed in successfully',
      icon: 'success',
      toast: true,
      position: this.position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  }
}
