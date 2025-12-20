import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-live-toast',
  imports: [CardComponent],
  templateUrl: './live-toast.component.html',
  styleUrl: './live-toast.component.scss'
})

export class LiveToastComponent {

  public toast = {
    topRight: false,
    bottomRight: false,
    topLeft: false,
    bottomLeft: false
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
