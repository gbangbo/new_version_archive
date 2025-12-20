import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { artworksDetails } from '../../../../../shared/data/dashboard/nft';
import { ArtworkDetails } from '../../../../../shared/interface/dashboard/nft';
import { cardToggleOptions1 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-artwork-table',
  imports: [CardComponent, TableComponent],
  templateUrl: './artwork-table.component.html',
  styleUrl: './artwork-table.component.scss'
})

export class ArtworkTableComponent {

  public artworks: ArtworkDetails[];
  public cardToggleOptions = cardToggleOptions1;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Artwork Name', field_value: 'artwork_name', sort: true },
      { title: 'Total Sales', field_value: 'total_sales', sort: true, },
      { title: 'Total USD', field_value: 'total_usd', sort: true },
    ],
    data: [] as ArtworkDetails[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    (window as any)['navigateToCustomer'] = () => {
      this.router.navigate(['/seller/list']);
    };

    this.tableConfig.data = this.formatArtworkDetails(artworksDetails);
    this.artworks = artworksDetails;
  }

  private formatArtworkDetails(artworksDetails: ArtworkDetails[]) {
    return artworksDetails.map((artwork: ArtworkDetails) => {
      const formattedArtwork = { ...artwork };
      formattedArtwork.artwork_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="flex">
                                        <img class="max-w-full rounded-full me-2" src="${artwork.artwork_profile}" alt="user">
                                        <div class="img-content-box">
                                          <a class="font-medium" href="javascript:void(0)" onclick="navigateToCustomer()">${artwork.artwork_name}</a>
                                          <p class="mb-0 f-light">${artwork.owner_name}</p>
                                        </div>
                                      </div>`);
                                      
      return formattedArtwork;
    });
  }
}
