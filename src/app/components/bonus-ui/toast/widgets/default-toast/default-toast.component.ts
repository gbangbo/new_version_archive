import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-default-toast',
  imports: [CommonModule, CardComponent],
  templateUrl: './default-toast.component.html',
  styleUrl: './default-toast.component.scss'
})

export class DefaultToastComponent {

  public showToast: boolean = true;

  closeToast() {
    this.showToast = false;
  }

}
