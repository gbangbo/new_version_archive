import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Select2Module, Select2UpdateEvent } from 'ng-select2-component';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { toastPosition } from '../../../../../shared/data/bonus-ui/toast';

@Component({
  selector: 'app-toast-placement',
  imports: [CommonModule, Select2Module, CardComponent],
  templateUrl: './toast-placement.component.html',
  styleUrl: './toast-placement.component.scss'
})

export class ToastPlacementComponent {

  public showToast: boolean = true;
  public toastPosition = toastPosition;
  public positionClass: any = '';

  handlePosition(event: Select2UpdateEvent) {
    if(event && event.value) {
      const selectedPosition = event.value;
      this.positionClass = selectedPosition;
    }
  }

  closeToast() {
    this.showToast = false;
  }
  
}
