import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { topNFT } from '../../../../../shared/data/dashboard/nft';
import { TopNFT } from '../../../../../shared/interface/dashboard/nft';
import { cardToggleOptions7 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-top-nft',
  imports: [CardComponent, TableComponent],
  templateUrl: './top-nft.component.html',
  styleUrl: './top-nft.component.scss'
})

export class TopNftComponent {

  public nfts: TopNFT[];
  public cardToggleOptions = cardToggleOptions7;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Collections', field_value: 'collection_name', sort: true },
      { title: 'Volume', field_value: 'volume', sort: true, },
      { title: '24h %', field_value: 'profit', sort: true },
      { title: 'Items', field_value: 'items', sort: true },
    ],
    data: [] as TopNFT[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}
  
  ngOnInit() {
    (window as any)['navigateToTopNFT'] = () => {
      this.router.navigate(['/category']);
    };

    this.tableConfig.data = this.formatNFTDetails(topNFT);
    this.nfts = topNFT;
  }

  private formatNFTDetails(nfts: TopNFT[]) {
    return nfts.map((nft: TopNFT) => {
      const formattedNFT = { ...nft };
      formattedNFT.collection_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="product-content">
                                        <div class="order-image">
                                          <img src="${ nft.profile }" alt="author">
                                          <img class="mark-img" src="assets/images/dashboard-6/author/mark.png" alt="mark icon">
                                        </div>
                                        <div> 
                                          <h6 class="f-14 mb-0">
                                            <a href="javascript:void(0" onclick="navigateToTopNFT()">${ nft.collection_name }</a>
                                          </h6>
                                          <span class="f-light f-12">Manfers nfts</span>
                                        </div>
                                      </div>`);

      formattedNFT.volume = `<div class="flex items-center">
                                <img class="me-2" src="assets/images/dashboard-6/nft.png" alt="nft icon">
                                <span>$${nft.volume}</span>
                              </div>`;
                              
      formattedNFT.profit = `<div class="flex items-center font-${nft.profit_type == 'profit' ? 'success' : 'danger'}"><span>${nft.profit}</span></div>`;
     
      return formattedNFT;
    });
  }
}
