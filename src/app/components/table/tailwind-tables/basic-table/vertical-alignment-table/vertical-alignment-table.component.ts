import { Component } from '@angular/core';

import { TableComponent } from "../../../../../shared/components/ui/table/table.component";
import { CardComponent } from "../../../../../shared/components/ui/card/card.component";
import { verticalAlignment } from '../../../../../shared/data/tailwind-table';
import { TableConfigs } from '../../../../../shared/interface/common';

@Component({
  selector: 'app-vertical-alignment-table',
  imports: [TableComponent, CardComponent],
  templateUrl: './vertical-alignment-table.component.html',
  styleUrl: './vertical-alignment-table.component.scss'
})

export class VerticalAlignmentTableComponent {

  public verticalAlignment = verticalAlignment;

  public tableConfig: TableConfigs = {
    columns: [
      { title: 'Heading1', field_value: 'heading1' },
      { title: 'Heading2', field_value: 'heading2' },
      { title: 'Heading3', field_value: 'heading3' },
      { title: 'Heading4', field_value: 'heading4' },
    ],
    data: verticalAlignment
  };

}
