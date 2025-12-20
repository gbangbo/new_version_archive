import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-password-generator-sweetalert',
  imports: [CardComponent],
  templateUrl: './password-generator-sweetalert.component.html',
  styleUrl: './password-generator-sweetalert.component.scss'
})

export class PasswordGeneratorSweetalertComponent {

  async open() {
    const { value: password } = await Swal.fire({
      title: "Enter your password",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off",
      },
    });
    if (password) {
      Swal.fire(`Entered password: ${password}`);
    }
  }
  
}
