import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
    selector: 'app-clipboard-on-textarea',
    imports: [CommonModule, FormsModule, CardComponent],
    templateUrl: './clipboard-on-textarea.component.html',
    styleUrl: './clipboard-on-textarea.component.scss'
})

export class ClipboardOnTextareaComponent {

  public clipboardExample2: string = "A web designer must always enhance their work since creating websites is a creative effort. Therefore, a web designer must be more imaginative to produce exceptional results. Blogs about web design assist web designers in learning about new technologies, offer lessons, news, direction for a freebie, and much more. These blogs allow web designers to stay creative and improve their abilities. Therefore, advice from web design blogs is required to improve your business.";
  public copyText: string = ""

  copyFunction(txt: string) {
    navigator.clipboard.writeText(txt);
    Swal.fire({
      title: 'Copied to Clipboard',
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    })
  }
  
  cutFunction(details: string) {
    switch (details) {
      case 'clipboardExample2': navigator.clipboard.writeText(this.clipboardExample2); this.clipboardExample2 = '';
        break;
      default:
        break;
    }
  }

}
