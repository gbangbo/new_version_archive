import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-image-message-sweetalert',
  imports: [CardComponent],
  templateUrl: './image-message-sweetalert.component.html',
  styleUrl: './image-message-sweetalert.component.scss'
})

export class ImageMessageSweetalertComponent {

  open() {
    Swal.fire({
      title: "Sweet!",
      text: "Modal with a custom image.",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  }
  
}
