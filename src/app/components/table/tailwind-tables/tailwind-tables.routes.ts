import { Routes } from '@angular/router';

import { BasicTableComponent } from './basic-table/basic-table.component';
import { TableComponentsComponent } from './table-components/table-components.component';

export const tailwindTables: Routes = [
    {
        path: 'basic-tables',
        component: BasicTableComponent,
        data: {
            title: "Tailwind Basic Tables",
            breadcrumb: "Tailwind Basic Tables",
        }
    },
    {
        path: 'table-components',
        component: TableComponentsComponent,
        data: {
            title: "Table Components",
            breadcrumb: "Table Components",
        }
    },
];