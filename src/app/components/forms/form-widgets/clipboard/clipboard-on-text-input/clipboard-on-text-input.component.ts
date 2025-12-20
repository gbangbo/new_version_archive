import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
    selector: 'app-clipboard-on-text-input',
    imports: [CommonModule, FormsModule, CardComponent],
    templateUrl: './clipboard-on-text-input.component.html',
    styleUrl: './clipboard-on-text-input.component.scss'
})

export class ClipboardOnTextInputComponent {

  public clipboardExample1: string = '';
  public copyText: string = ""

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    Swal.fire({
      title: 'Copied to clipboard',
      icon: 'success',
      toast: true,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      position:'top-end'
    })
  }

  cutFunction(details: string) {
    switch (details) {
      case 'clipboardExample1': navigator.clipboard.writeText(this.clipboardExample1); this.clipboardExample1 = '';
        break;
      default:
        break;
    }
  }

}
