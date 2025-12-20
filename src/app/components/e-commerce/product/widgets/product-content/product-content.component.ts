import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BarRatingModule } from 'ngx-bar-rating';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { socialShareOptions } from '../../../../../shared/data/product';

@Component({
  selector: 'app-product-content',
  imports: [BarRatingModule, RouterModule, CommonModule, FormsModule, ReactiveFormsModule, CardComponent],
  templateUrl: './product-content.component.html',
  styleUrl: './product-content.component.scss'
})

export class ProductContentComponent {

  public ctrl = new FormControl<number | null>(null, Validators.required);
  public readonly: boolean = false;
  public socialShareOptions = socialShareOptions;
  public counter : number = 1;

  changeValue(value: number) {
    if(value == -1){
      if(this.counter > 1){
        this.counter -= 1;
      }
    }else if(value == 1){
      this.counter += 1;
    }
  }
  
}
