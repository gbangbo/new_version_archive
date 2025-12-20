import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
    selector: 'app-copy-portion-from-paragraph',
    imports: [CommonModule, FormsModule, CardComponent],
    templateUrl: './copy-portion-from-paragraph.component.html',
    styleUrl: './copy-portion-from-paragraph.component.scss'
})

export class CopyPortionFromParagraphComponent {

  public copyHighlightTxt: string = 'Web design is the process of creating websites';
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
