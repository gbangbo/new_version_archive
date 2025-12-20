import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarRatingModule } from 'ngx-bar-rating';

import { ReviewModalComponent } from '../../../../../shared/components/ui/modal/review-modal/review-modal.component';
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { productDetails, productDetailsTab } from '../../../../../shared/data/product';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-product-details-tab',
  imports: [CommonModule, BarRatingModule, TableComponent, ReviewModalComponent],
  templateUrl: './product-details-tab.component.html',
  styleUrl: './product-details-tab.component.scss'
})

export class ProductDetailsTabComponent {
  
  public productDetails = productDetails;
  public productDetailsTab = productDetailsTab;
  public rating: number[] = Array.from({length: 5}, (_, i) => i + 1);
  public activeTab: string = 'description';
  public modalOpen: boolean = false;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Material', field_value: 'material' },
      { title: 'Colors', field_value: 'colors' },
      { title: 'Size Range', field_value: 'size_range' },
      { title: 'Fit', field_value: 'fit' },
      { title: 'NeckLine', field_value: 'neckline' },
      { title: 'Seam', field_value: 'seam' }
    ],
    data: productDetails.additional_info
  };

  handleTab(value: string) {
    this.activeTab = value;
  }

  openReviewModal() {
    this.modalOpen = true;
  }

  handleModalOpen(value: boolean) {
    this.modalOpen = value;
  }
}
