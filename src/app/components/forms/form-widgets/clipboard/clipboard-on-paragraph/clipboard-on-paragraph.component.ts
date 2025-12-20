import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
    selector: 'app-clipboard-on-paragraph',
    imports: [CommonModule, FormsModule, CardComponent],
    templateUrl: './clipboard-on-paragraph.component.html',
    styleUrl: './clipboard-on-paragraph.component.scss'
})

export class ClipboardOnParagraphComponent {

  public paragraphDetails = "On that day, hopes and dreams were crushed. Even though it should have been anticipated, it nonetheless surprised me. The warning indicators have been disregarded in favour of the slim chance that it would actually occur. From a hopeful prospect, it had evolved into an unquestionable conviction that it must be fate. That was up until it wasn't, at which point all of the aspirations and dreams collapsed."
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

}
