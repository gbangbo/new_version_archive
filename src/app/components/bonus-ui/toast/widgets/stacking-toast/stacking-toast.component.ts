import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from "../../../../../shared/components/ui/feather-icon/feather-icon.component";
import { stackingToast } from '../../../../../shared/data/bonus-ui/toast';

@Component({
  selector: 'app-stacking-toast',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './stacking-toast.component.html',
  styleUrl: './stacking-toast.component.scss'
})

export class StackingToastComponent {

  public stackingToast = stackingToast;

  constructor(){
    this.stackingToast.forEach((toast) => {
      if(toast){
        setTimeout(() => {
          toast.show = false
        }, toast.time_out);
      }
    })
  }

  closeToast(id: number){
    this.stackingToast.filter((toast) => {
      if(toast.id == id){
        toast.show = false;
      }
    })
  }

}
