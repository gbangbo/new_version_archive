import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CardDropdownButtonComponent } from "../../../../../shared/components/ui/card/card-dropdown-button/card-dropdown-button.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { artworks } from '../../../../../shared/data/dashboard/nft';
import { Artwork } from '../../../../../shared/interface/dashboard/nft';
import { cardToggleOptions7 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-artworks',
  imports: [CardDropdownButtonComponent, TableComponent],
  templateUrl: './artworks.component.html',
  styleUrl: './artworks.component.scss'
})

export class ArtworksComponent {

  public dropdownToggleOption = cardToggleOptions7;
  public artworks: Artwork[];

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Course', field_value: 'course_name', sort: false },
      { title: 'Sale', field_value: 'sale', sort: false },
      { title: 'Earnings', field_value: 'earnings', sort: false },
    ],
    data: [] as Artwork[]
  };

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    (window as any)['navigateToArtWork'] = () => {
      this.router.navigate(['/seller/1']);
    };

    this.tableConfig.data = this.formatArtworkDetails(artworks);
    this.artworks = artworks;
  }

  private formatArtworkDetails(artworks: Artwork[]) {
    return artworks.map((artwork: Artwork) => {
      const formattedArtwork = { ...artwork };
      formattedArtwork.course_name = this.sanitizer.bypassSecurityTrustHtml(`<div class="flex items-center gap-2"> 
                                        <img src="${artwork.course_profile}" alt="${artwork.course_name}">
                                        <div> 
                                          <a class="f-14" href="javascript:void(0)" onclick="navigateToArtWork()">
                                            ${artwork.course_name}
                                          </a>
                                          <span class="f-light f-12">${artwork.course_site}</span></div>
                                      </div>`);

      formattedArtwork.sale = `<h6 class="f-14">${artwork.sale}</h6>`;

      formattedArtwork.earnings = `<span class="badge badge-light-success font-medium">$${artwork.earnings}</span>`;
      
      return formattedArtwork;
    });
  }
}
