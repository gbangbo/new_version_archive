import { Component } from '@angular/core';

import { BasicTableWithBorderBottomColorComponent } from "./basic-table-with-border-bottom-color/basic-table-with-border-bottom-color.component";
import { TailwindTableWithVariantsComponent } from "./tailwind-table-with-variants/tailwind-table-with-variants.component";
import { InverseTableComponent } from "./inverse-table/inverse-table.component";
import { InverseTableBackgroundComponent } from "./inverse-table-background/inverse-table-background.component";
import { CaptionComponent } from "./caption/caption.component";
import { TableHeadOptionsComponent } from "./table-head-options/table-head-options.component";
import { StripedRowWithInverseTableComponent } from "./striped-row-with-inverse-table/striped-row-with-inverse-table.component";
import { StripedColumnsComponent } from "./striped-columns/striped-columns.component";
import { ActiveTablesComponent } from "./active-tables/active-tables.component";
import { TableBordersComponent } from "./table-borders/table-borders.component";
import { TableWithoutBordersComponent } from "./table-without-borders/table-without-borders.component";
import { VerticalAlignmentTableComponent } from "./vertical-alignment-table/vertical-alignment-table.component";
import { NestingTableComponent } from "./nesting-table/nesting-table.component";
import { AnatomyTableComponent } from "./anatomy-table/anatomy-table.component";
import { TableFootComponent } from "./table-foot/table-foot.component";
import { TableGroupDividersComponent } from "./table-group-dividers/table-group-dividers.component";
import { BreakpointSpecificComponent } from "./breakpoint-specific/breakpoint-specific.component";
import { ResponsiveTableComponent } from "./responsive-table/responsive-table.component";
import { SizingTableComponent } from "./sizing-table/sizing-table.component";
import { CustomTableColorComponent } from "./custom-table-color/custom-table-color.component";
import { DashedBorderComponent } from "./dashed-border/dashed-border.component";
import { HoverRowTableComponent } from "./hover-row-table/hover-row-table.component";

@Component({
  selector: 'app-basic-table',
  imports: [BasicTableWithBorderBottomColorComponent, TailwindTableWithVariantsComponent, InverseTableComponent,
            HoverRowTableComponent, InverseTableBackgroundComponent, CaptionComponent,
            TableHeadOptionsComponent, StripedRowWithInverseTableComponent, StripedColumnsComponent,
            ActiveTablesComponent, TableBordersComponent, TableWithoutBordersComponent,
            VerticalAlignmentTableComponent, NestingTableComponent, AnatomyTableComponent,
            TableFootComponent, TableGroupDividersComponent, BreakpointSpecificComponent,
            ResponsiveTableComponent, SizingTableComponent, CustomTableColorComponent, DashedBorderComponent, ],
  templateUrl: './basic-table.component.html',
  styleUrl: './basic-table.component.scss'
})

export class BasicTableComponent {

}
