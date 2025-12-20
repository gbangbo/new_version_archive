import { Component } from '@angular/core';

import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { sessionByBrowser } from '../../../../../shared/data/dashboard/analytics';
import { SessionByBrowser } from '../../../../../shared/interface/dashboard/analytics';
import { cardToggleOptions3 } from '../../../../../shared/data/common';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-session-by-browser',
  imports: [CardComponent, TableComponent],
  templateUrl: './session-by-browser.component.html',
  styleUrl: './session-by-browser.component.scss'
})

export class SessionByBrowserComponent {

  public sessionByBrowser = sessionByBrowser;
  public cardToggleOption = cardToggleOptions3;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Browser', field_value: 'browser' },
      { title: 'Sessions', field_value: 'sessions' },
    ],
    data: [] as SessionByBrowser[]
  };

  ngOnInit() {
    this.tableConfig.data = sessionByBrowser.map((details: SessionByBrowser) => {
      const formattedDetails = { ...details };
      formattedDetails.browser = `<div class="common-flex items-center">
                                      <img class="max-w-full rounded-full" src="${details.image}" alt="browsers">
                                      <a class="session-name" href="javascript:void(0)">${details.browser}</a>
                                  </div>`;

      return formattedDetails;
    });
  }

}
