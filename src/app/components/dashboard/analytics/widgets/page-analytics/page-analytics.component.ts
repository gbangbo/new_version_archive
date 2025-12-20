import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { pageAnalytics } from '../../../../../shared/data/dashboard/analytics';
import { cardToggleOptions2 } from '../../../../../shared/data/common';
import { PageAnalytics } from '../../../../../shared/interface/dashboard/analytics';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-page-analytics',
  imports: [TableComponent, CardComponent],
  templateUrl: './page-analytics.component.html',
  styleUrl: './page-analytics.component.scss'
})

export class PageAnalyticsComponent {

  public pageAnalytics = pageAnalytics;
  public cardToggleOption = cardToggleOptions2;

  public tableConfig: TableConfigs = {
      columns: [
        { title: 'Page Name', field_value: 'page_name', sort: true },
        { title: 'Page Views', field_value: 'page_views', sort: true },
        { title: 'Bounce Rate', field_value: 'bounce_rate', sort: true },
        { title: 'Click Rate', field_value: 'click_rate', sort: true },
        { title: 'Devices', field_value: 'devices', sort: true },
      ],
      data: [] as PageAnalytics[]
    };
  
    ngOnInit() {
      this.tableConfig.data = pageAnalytics.map((details: PageAnalytics) => {
        const formattedDetails = { ...details };
        formattedDetails.page_views = ` <div class="change-currency flex"> 
                                        ${details.page_views}
                                        </div>`;
        formattedDetails.bounce_rate = ` <div class="change-currency flex"> 
                                        ${details.bounce_rate}
                                        </div>`;
        formattedDetails.click_rate = `<div class="change-currency flex">
                                      ${details.click_rate}
                                      </div>`;
        return formattedDetails;
      });
    }

}
