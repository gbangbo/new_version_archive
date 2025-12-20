import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { sellerDetails } from '../../../../../../shared/data/store';

@Component({
  selector: 'app-seller-product-review',
  imports: [CommonModule, BarRatingModule],
  templateUrl: './seller-product-review.component.html',
  styleUrl: './seller-product-review.component.scss'
})

export class SellerProductReviewComponent {

  public productReview = sellerDetails.review;

}
