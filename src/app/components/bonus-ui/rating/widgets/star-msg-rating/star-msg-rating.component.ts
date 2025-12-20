import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";

@Component({
  selector: 'app-star-msg-rating',
  imports: [CommonModule, BarRatingModule, CardComponent],
  templateUrl: './star-msg-rating.component.html',
  styleUrl: './star-msg-rating.component.scss'
})

export class StarMsgRatingComponent {

  public faoRate = 0;
  public faoRated = false;

  public ratingMessages = ['Simple and effective', 'Great value!', 'High-quality product', 'Will definitely order again', 'Delicious and satisfying'];

  onFaoRate(e: number) {
    this.faoRated = true;
    this.faoRate = e;
  }

  getRatingString(rating: number): string {
    return this.ratingMessages[rating - 1] || ''; 
  }
  
}
