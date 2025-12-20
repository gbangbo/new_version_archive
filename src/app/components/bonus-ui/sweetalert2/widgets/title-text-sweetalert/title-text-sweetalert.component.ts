import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from './../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-title-text-sweetalert',
  imports: [CardComponent],
  templateUrl: './title-text-sweetalert.component.html',
  styleUrl: './title-text-sweetalert.component.scss'
})

export class TitleTextSweetalertComponent {

  open() {
    Swal.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question",
    })
  }
  
}
