import { Component } from '@angular/core';
import { Select2Module, Select2UpdateEvent } from 'ng-select2-component';

import { CardComponent } from "../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../shared/components/ui/table/table.component";
import { rating, reviews, reviewStatus } from '../../../shared/data/review';
import { TableClickedAction, TableConfigs } from '../../../shared/interface/common';
import { Review } from '../../../shared/interface/review';

@Component({
  selector: 'app-reviews',
  imports: [Select2Module, CardComponent, TableComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})

export class ReviewsComponent {

  public rating = rating;
  public reviewStatus = reviewStatus;
  public reviews: Review[];
  public filter: any = {
    rating: null,
    status: ''
  };

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Product', field_value: 'product_name', sort: true },
      { title: 'Reviewer', field_value: 'reviewer_name', sort: true },
      { title: 'Review', field_value: 'review', sort: true },
      { title: 'Date', field_value: 'date', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    row_action: [
      { label: "Delete", action_to_perform: "delete", icon: "trash1", modal:true, model_text: "Do you really want to delete the review?" }
    ],
    data: [] as Review[]
  };

  ngOnInit() {
    this.tableConfig.data = this.formatReview(reviews);
    this.reviews = reviews;
  }

  handleAction(value: TableClickedAction) {
    if (value.action_to_perform === "delete" && value.data) {
        this.reviews = this.reviews.filter((review: Review) => review.id !== value.data.id);
        this.tableConfig = {...this.tableConfig, data: this.formatReview(this.reviews)};
      }
  }

  handleUpdate(event: Select2UpdateEvent, field: string) {
    this.filter[field] = event && event.value ? event.value : null;;
    this.tableConfig = {...this.tableConfig, data: this.formatReview(this.filterDetails())};
  }

  filterDetails() {
    return this.reviews.filter(review => {
      const matchesRating = this.filter.rating
        ? review.rating === this.filter.rating
        : true;
      const matchesStatus = this.filter.status
        ? review.status === this.filter.status
        : true;

      return matchesRating && matchesStatus;
    });
  }

  private formatReview(reviews: Review[]) {
    return reviews.map((review: Review) => {
      const formattedReview = { ...review };
      formattedReview.product_name = `<div class="product-names">
                                      <div class="light-product-box">
                                      <img class="max-w-full" src="${review.product_image}" alt="${review.product_name}"></div>
                                      <p>${review.product_name}</p>
                                    </div>`;

      formattedReview.reviewer_name = `<div class="common-f-start">
                                        <img class="max-w-full" src="${review.reviewer_profile}" alt="${review.reviewer_name}">
                                        <div class="user-details">
                                          <a href="javascript:void(0)">${review.reviewer_name}</a>
                                          <p class="mb-0">${review.reviewer_email}</p>
                                        </div>
                                      </div>`;

      const totalStars = 5;
      let starsHtml = '';
      for (let i = 0; i < review.rating; i++) {
        starsHtml += '<i class="fa-solid fa-star txt-warning"></i>';
      }

      for (let i = review.rating; i < totalStars; i++) {
        starsHtml += '<i class="fa-regular fa-star txt-warning"></i>';
      }

      formattedReview.review = `<div class="rating">
                                  ${starsHtml}
                                </div>
                                <div class="customer-review">
                                  <span>
                                    ${review.review}
                                  </span>
                                </div>`;
      formattedReview.status = review.status === 'Approve' ?
                        `<span class="badge badge-light-success">${review.status}</span>` :
                        review.status === 'Reject' ?
                        `<span class="badge badge-light-danger">${review.status}</span>` : '-';



      return formattedReview;
    });
  }

}
