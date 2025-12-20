import { Routes } from "@angular/router";

import { SearchResultComponent } from "./search-result.component";

export const searchResult: Routes = [
    {
        path: '',
        component: SearchResultComponent,
        data: {
            title: 'Search Result',
            breadcrumb: 'Search Result'
        }
    }
]