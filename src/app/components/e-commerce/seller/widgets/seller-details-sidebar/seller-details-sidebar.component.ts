import { Component } from '@angular/core';

import { SellerDetailsComponent } from "./seller-details/seller-details.component";
import { SellerNotificationsComponent } from "./seller-notifications/seller-notifications.component";
import { SellerPoliciesComponent } from "./seller-policies/seller-policies.component";
import { SellerProductReviewComponent } from "./seller-product-review/seller-product-review.component";
import { SellerRatingComponent } from "./seller-rating/seller-rating.component";
import { sellerDetailsAccordion } from '../../../../../shared/data/store';

@Component({
  selector: 'app-seller-details-sidebar',
  imports: [SellerDetailsComponent, SellerRatingComponent,
            SellerNotificationsComponent, SellerPoliciesComponent, SellerProductReviewComponent],
  templateUrl: './seller-details-sidebar.component.html',
  styleUrl: './seller-details-sidebar.component.scss'
})

export class SellerDetailsSidebarComponent {

  public sidebarOpen: boolean = false;
  public sellerDetailsAccordion = sellerDetailsAccordion;
  public accordionOpen: { [key: number]: boolean } = {};

  ngOnInit() {
    if(this.sellerDetailsAccordion) {
      this.sellerDetailsAccordion.forEach((accordion) => {
        this.accordionOpen[accordion.id] = true;
      })
    }
  }
  
  toggleSidebar() {
    this.sidebarOpen =! this.sidebarOpen;
  }

  toggleAccordion(index: number) {
    if (this.accordionOpen[index]) {
      this.accordionOpen[index] = false;
    } else {
      this.accordionOpen[index] = true;
    }
  }
  
}
