import { Component } from '@angular/core';

import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { anatomyTable } from '../../../../../shared/data/tailwind-table';
import { AnatomyTable } from '../../../../../shared/interface/tailwind-table';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-anatomy-table',
  imports: [TableComponent, CardComponent],
  templateUrl: './anatomy-table.component.html',
  styleUrl: './anatomy-table.component.scss'
})

export class AnatomyTableComponent {

  public anatomyTable = anatomyTable;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Version', field_value: 'version' },
      { title: 'Release Date', field_value: 'release_date' },
      { title: 'New Features', field_value: 'new_features' },
      { title: 'Bug Fixes', field_value: 'bug_fixes' },
    ],
    data: [] as AnatomyTable[]
  };

  ngOnInit() {
    this.tableConfig.data = anatomyTable.map((details: AnatomyTable) => {
      const formattedDetails = { ...details };
      formattedDetails.version = ` <span class="badge text-white badge-${details.class}">${details.version}</span>`;
      return formattedDetails;
    });
  }

}
