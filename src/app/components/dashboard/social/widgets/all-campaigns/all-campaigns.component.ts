import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { campaigns } from '../../../../../shared/data/dashboard/social';
import { Campaigns } from '../../../../../shared/interface/dashboard/social';
import { cardToggleOptions8 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-all-campaigns',
  imports: [CardComponent, TableComponent],
  templateUrl: './all-campaigns.component.html',
  styleUrl: './all-campaigns.component.scss'
})

export class AllCampaignsComponent {

  public cardToggleOption = cardToggleOptions8;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'AD Platform', field_value: 'platform_name', sort: true },
      { title: 'Campaign', field_value: 'campaign', sort: true },
      { title: 'GEO', field_value: 'geo', sort: true },
      { title: 'Profitability', field_value: 'profitability', sort: true },
      { title: 'Impressions', field_value: 'impressions', sort: true },
      { title: 'Status', field_value: 'status', sort: true },
    ],
    row_action: [
      { label: 'Create' }
    ],
    data: [] as Campaigns[]
  };
  
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.tableConfig.data = campaigns.map((campaign: Campaigns) => {
      const formattedCampaigns = { ...campaign };
      formattedCampaigns.platform_name =`<div class="${campaign.platform_name}">
                                          <div class="social-circle">
                                            <i class="fa-brands fa-${campaign.platform_logo}"></i></div>
                                        </div>`;

      const imageHtml = ` <div class="change-currency flex">
                        ${campaign.profitability}
                        </div>`;

      formattedCampaigns.profitability = this.sanitizer.bypassSecurityTrustHtml(imageHtml)

      const statusHTML =`<button class="btn badge-light-${campaign.status == 'Active' ? 'primary' : 'light'}">${campaign.status}</button>`;

      formattedCampaigns.status = this.sanitizer.bypassSecurityTrustHtml(statusHTML)
      
      return formattedCampaigns;
    });
  }
}
