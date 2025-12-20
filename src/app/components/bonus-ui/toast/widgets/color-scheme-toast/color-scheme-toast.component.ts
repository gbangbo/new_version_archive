import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-color-scheme-toast',
  imports: [CommonModule, CardComponent],
  templateUrl: './color-scheme-toast.component.html',
  styleUrl: './color-scheme-toast.component.scss'
})

export class ColorSchemeToastComponent {

  public showToast: boolean = true;

  closeToast() {
    this.showToast = false;
  }
  
}
