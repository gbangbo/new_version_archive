import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { sellerDetails } from '../../../../../../shared/data/store';

@Component({
  selector: 'app-seller-rating',
  imports: [CommonModule],
  templateUrl: './seller-rating.component.html',
  styleUrl: './seller-rating.component.scss'
})

export class SellerRatingComponent {

  public sellerRating = sellerDetails.rating;
  public rating: number[] = Array.from({length: 5}, (_, i) => i + 1);

}
