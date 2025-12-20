import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { sellerDetails, stores } from '../../../../../../shared/data/store';
import { Store } from '../../../../../../shared/interface/store';

@Component({
  selector: 'app-seller-details',
  imports: [],
  templateUrl: './seller-details.component.html',
  styleUrl: './seller-details.component.scss'
})

export class SellerDetailsComponent {

  public storeId: number;
  public currentStore: Store;
  public details = sellerDetails.details;
  public stores = stores;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.storeId = id;
        const store = this.stores.find(store => store.id === this.storeId);
        if(store) {
          this.currentStore = store;
        }
      }
    });
  }
}
