import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';

@Component({
  selector: 'app-message-toast',
  imports: [CardComponent, FeatherIconComponent],
  templateUrl: './message-toast.component.html',
  styleUrl: './message-toast.component.scss'
})

export class MessageToastComponent {

  public toast = {
    success: false,
    warning: false,
    error: false
  }

  showToast(value: keyof typeof this.toast) {
    this.toast[value] = true;

    setTimeout(() => {
      this.toast[value] = false;
    }, 5000);
  }

  closeToast(value: keyof typeof this.toast) {
    this.toast[value] = false;
  }
  
}
