import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { CardComponent } from '../../../../../shared/components/ui/card/card.component';
import { TableComponent } from '../../../../../shared/components/ui/table/table.component';
import { referralsVisit } from '../../../../../shared/data/dashboard/analytics';
import { ReferralsVisit } from '../../../../../shared/interface/dashboard/analytics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-referrals-visit',
  imports: [TableComponent, CardComponent],
  templateUrl: './referrals-visit.component.html',
  styleUrl: './referrals-visit.component.scss',
})

export class ReferralsVisitComponent {

  public referralsVisit = referralsVisit;
  public cardToggleOption = cardToggleOptions3;
  
  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Social Network', field_value: 'social_network' },
      { title: 'Conversion Rate', field_value: 'conversion_rate' },
      { title: 'Visits', field_value: 'visits' },
    ],
    data: [] as ReferralsVisit[],
  };
  
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.tableConfig.data = referralsVisit.map((details: ReferralsVisit) => {
      const formattedDetails = { ...details };
      const networkHTML = `<div class="referral-wrapper">
                            <div>
                              <div class="border-${details.icon_class}">   
                                <div class="social-wrapper bg-light-${
                                  details.icon_class ? details.icon_class : ''
                                }">
                                <svg class="stroke-icon">
                                    <use href="assets/svg/icon-sprite.svg#${
                                      details.icon
                                    }"></use>
                                  </svg>
                                </div>
                              </div>
                              <span class="font-medium">${
                                details.social_network
                              }</span>
                            </div>
                          </div>`;
                          
      formattedDetails.social_network = this.sanitizer.bypassSecurityTrustHtml(networkHTML);

      const rateHTML = `<button class="btn button-light-${details.class} font-medium txt-${details.class}">${details.conversion_rate}</button>`;

      formattedDetails.conversion_rate = this.sanitizer.bypassSecurityTrustHtml(rateHTML);

      return formattedDetails;
    });
  }
}
