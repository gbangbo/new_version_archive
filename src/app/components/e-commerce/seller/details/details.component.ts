
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from "../../product/product-list/products/products.component";
import { RecentOrdersComponent } from '../widgets/recent-orders/recent-orders.component';
import { SalesOverviewComponent } from "../widgets/sales-overview/sales-overview.component";
import { SellerDetailsSidebarComponent } from "../widgets/seller-details-sidebar/seller-details-sidebar.component";
import { StoreGeneralDetailsComponent } from "../widgets/store-general-details/store-general-details.component";
import { TopSellingProductsComponent } from "../widgets/top-selling-products/top-selling-products.component";
import { storeGeneralDetails } from '../../../../shared/data/store';

@Component({
  selector: 'app-details',
  imports: [RouterModule,StoreGeneralDetailsComponent, SalesOverviewComponent,
            TopSellingProductsComponent, RecentOrdersComponent, ProductsComponent, SellerDetailsSidebarComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent {

  public storeGeneralDetails = storeGeneralDetails;

}
