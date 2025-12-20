import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { FeatherIconComponent } from '../../../../../shared/components/ui/feather-icon/feather-icon.component';
import { translucentToasts } from '../../../../../shared/data/bonus-ui/toast';

@Component({
  selector: 'app-translucent-toast',
  imports: [CommonModule, CardComponent, FeatherIconComponent],
  templateUrl: './translucent-toast.component.html',
  styleUrl: './translucent-toast.component.scss'
})

export class TranslucentToastComponent {

  public translucentToasts = translucentToasts;
  
  constructor(){
    this.translucentToasts.forEach((toast) => {
      if(toast){
        setTimeout(() => {
          toast.show = false
        }, toast.time_out);
      }
    })
  }

  closeToast(id: number){
    this.translucentToasts.filter((toast) => {
      if(toast.id == id){
        toast.show = false;
      }
    })
    
  }
  
}
