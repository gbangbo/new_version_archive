import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-unique-toast',
  imports: [CommonModule, CardComponent],
  templateUrl: './unique-toast.component.html',
  styleUrl: './unique-toast.component.scss'
})

export class UniqueToastComponent {

  public showToast: boolean = true;

  closeToast() {
    this.showToast = false;
  }
  
}
